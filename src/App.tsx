import { useState, useCallback, useEffect } from "react";
import { RadioGroup, HistoryModal, Table } from "./components";
import { convertToHistoryAspectRatios } from "./helpers";
import { useAspectRatioHistory } from "./hooks";
import { AspectRatioSVG, CloseSVG } from "./svg-icons";
import type {
  AspectRatioWithFormats,
  Separator,
  RatioForm,
  OptionsObject,
} from "./types";

const separatorForms: OptionsObject<Separator>[] = [
  {
    title: "Colon",
    subtitle: "300:9",
  },
  {
    title: "Slash",
    subtitle: "300/9",
  },
];

const ratioForms: OptionsObject<RatioForm>[] = [
  {
    title: "Regular Ratio",
    subtitle: "300:9, 300/9",
  },
  {
    title: "Reduced Ratio",
    subtitle: "100:3, 100/3",
  },
  {
    title: "Decimal",
    subtitle: "33.3",
  },
  {
    title: "Rounded Decimal",
    subtitle: "33",
  },
];

export default function App() {
  const [separator, setSeparator] = useState<Separator>(
    separatorForms[0].title,
  );
  const [ratioForm, setRatioForm] = useState<RatioForm>(ratioForms[0].title);

  const { history, addRatio, clearHistory } = useAspectRatioHistory();

  const [aspectRatios, setAspectRatios] = useState<AspectRatioWithFormats[]>(
    [],
  );

  function getAspectRatio() {
    parent.postMessage({ type: "ASPECT_RATIO_CALCULATION" }, "*");
  }

  function closePlugin() {
    parent.postMessage({ type: "CLOSE_UI" }, "*");
  }

  function sendClipboardCopy(content: string) {
    parent.postMessage({ type: "COPY_TO_CLIPBOARD", content }, "*");
  }

  const copyToClipboardHandler = useCallback(
    (index: number) => {
      const formattedAspectRatio =
        ratioForm === "Decimal" || ratioForm === "Rounded Decimal"
          ? aspectRatios[index][ratioForm]
          : aspectRatios[index][ratioForm][separator];
      sendClipboardCopy(formattedAspectRatio);
    },
    [aspectRatios, ratioForm, separator],
  );

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      console.log("from ui file:", event);

      const message: { type: string; content: AspectRatioWithFormats[] } =
        event.data;

      if (message?.type === "SUCCESS") {
        setAspectRatios(message.content);

        message.content.forEach((i) => {
          const newRatio = {
            nodeName: i.nodeName,
            aspectRatio:
              ratioForm === "Decimal" || ratioForm === "Rounded Decimal"
                ? i[ratioForm]
                : i[ratioForm][separator],
          };
          addRatio(newRatio);
        });
      }
    },
    [ratioForm, separator, addRatio],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <div className="bg-[--lb-primary] py-4 dark:bg-[--db-primary]">
      <span className="my-2 text-lg font-semibold text-black dark:text-white">
        Click on a Node
      </span>
      <div className="my-6">
        <span className="title-l font-bold text-black dark:text-white">
          Separator
        </span>
        <RadioGroup
          title="Separator"
          values={separatorForms}
          valueState={separator}
          setValueState={setSeparator}
        />
      </div>
      <div className="my-6">
        <span className="title-l font-bold text-black dark:text-white">
          Ratio Form
        </span>
        <RadioGroup
          title="Ratios"
          values={ratioForms}
          valueState={ratioForm}
          setValueState={setRatioForm}
        />
      </div>
      <div className="my-6 flex gap-x-4">
        <button onClick={getAspectRatio} className="calculate-button">
          <AspectRatioSVG />
          <span>Get AR</span>
        </button>
        <button onClick={closePlugin} className="close-button">
          <CloseSVG />
          <span>Close</span>
        </button>
      </div>
      <div className="mb-16 mt-6">
        <span className="mb-4 font-bold text-black dark:text-white">
          Aspect Ratio
        </span>
        {aspectRatios.length === 0 ? (
          <div className="mb-6 text-black dark:text-white">
            Click <kbd>Get AR</kbd> to get an aspect ratio.
          </div>
        ) : aspectRatios.length === 1 ? (
          <div className="mb-2 grid w-full grid-cols-1 gap-4">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-2 gap-4 p-3">
                  <dt className="font-black text-gray-900 dark:text-white">
                    Node Name
                  </dt>
                  <dd className="font-black text-gray-900 dark:text-white">
                    Aspect Ratio
                  </dd>
                </div>

                <div className="grid grid-cols-2 gap-4 p-3">
                  <dt className="break-words text-gray-700 dark:text-white">
                    {aspectRatios[0].nodeName}
                  </dt>
                  <dd className="break-words text-gray-700 dark:text-white">
                    {ratioForm === "Decimal" || ratioForm === "Rounded Decimal"
                      ? aspectRatios[0][ratioForm]
                      : aspectRatios[0][ratioForm][separator]}
                  </dd>
                </div>
              </dl>
            </div>
            <div
              onClick={() => copyToClipboardHandler(0)}
              className="radio-group-label cursor-pointer bg-black dark:bg-blue-violet-600"
            >
              <span className="w-full cursor-pointer text-center text-white">
                Click to copy
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <Table
              headers={["Node Name", "Aspect Ratio"]}
              data={convertToHistoryAspectRatios(
                aspectRatios,
                ratioForm,
                separator,
              )}
            />
            <button
              onClick={() => setAspectRatios([])}
              className="clear-button"
            >
              Clear Table
            </button>
          </div>
        )}
      </div>
      <HistoryModal history={history} clearHistory={clearHistory} />
    </div>
  );
}
