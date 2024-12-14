// import { BottomSheet } from "./react-stateful-bottom-sheet";
import { Fragment, useState } from "react";
import Table from "./Table";
import type { HistoryAspectRatio } from "../types";
import { Drawer } from "vaul";

type HistoryModalProps = {
  history: HistoryAspectRatio[];
  clearHistory: () => void;
};

export default function HistoryModal({
  history,
  clearHistory,
}: HistoryModalProps) {
  const setOpen = useState(false)[1];

  return (
    <Fragment>
      <div className="hidden sr-only">
      <Drawer.Root>
        <Drawer.Trigger>
          {history.length === 0 ? (
            <span className="title-m my-2 text-center text-2xl font-semibold text-black dark:text-white">
              No history
            </span>
          ) : (
            <button
              type="button"
              className="radio-group-label mb-4 bg-black dark:bg-blue-violet-600"
              onClick={() => setOpen(true)}
              aria-label="Open history"
            >
              <span className="w-full cursor-pointer text-center text-white">
                Open History
              </span>
            </button>
          )}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content>
            <Drawer.Title>History</Drawer.Title>
            <div>
              <div className="flex w-full">
                <span>History</span>
                <button type="button" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
              <div
                style={{ maxHeight: "350px" }}
                className="h-full w-full max-w-[350px] overflow-auto pl-3 pr-1"
              >
                {history.length === 0 ? (
                  <span className="title-m my-2 text-center text-2xl font-semibold text-black dark:text-white">
                    No history
                  </span>
                ) : (
                  <div className="py-4">
                    <Table
                      headers={["Node Name", "Aspect Ratio"]}
                      data={history}
                    />
                    <button onClick={clearHistory} className="clear-button">
                      Clear History
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
          </div>
    </Fragment>
  );
}

// export default function HistoryModal({
//   history,
//   clearHistory,
// }: HistoryModalProps) {
//   return (
//     <Fragment>
//       <BottomSheet>
//         {({ isOpen, setOpen }) => (
//           <div>
//             {isOpen ? (
//               <div>
//                 <div className="flex w-full">
//                   <span>History</span>
//                   <button type="button" onClick={() => setOpen(false)}>
//                     Close
//                   </button>
//                 </div>
//                 <div
//                   style={{ maxHeight: "350px" }}
//                   className="h-full w-full max-w-[350px] overflow-auto pl-3 pr-1"
//                 >
//                   {history.length === 0 ? (
//                     <span className="title-m my-2 text-center text-2xl font-semibold text-black dark:text-white">
//                       No history
//                     </span>
//                   ) : (
//                     <div className="py-4">
//                       <Table
//                         headers={["Node Name", "Aspect Ratio"]}
//                         data={history}
//                       />
//                       <button onClick={clearHistory} className="clear-button">
//                         Clear History
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ) : history.length === 0 ? (
//               <span className="title-m my-2 text-center text-2xl font-semibold text-black dark:text-white">
//                 No history
//               </span>
//             ) : (
//               <button
//                 type="button"
//                 className="radio-group-label mb-4 bg-black dark:bg-blue-violet-600"
//                 onClick={() => setOpen(true)}
//                 aria-label="Open history"
//               >
//                 <span className="w-full cursor-pointer text-center text-white">
//                   Open History
//                 </span>
//               </button>
//             )}
//           </div>
//         )}
//       </BottomSheet>
//     </Fragment>
//   );
// }
