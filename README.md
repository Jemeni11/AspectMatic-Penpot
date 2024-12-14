![Cover](https://github.com/user-attachments/assets/b38c3525-13d9-4d29-be8b-bfc2f7b141ce)

# AspectMatic

The Penpot plugin that helps developers with aspect ratio calculations.

## Introduction

I built this plugin after learning about the CSS `aspect-ratio` property and getting tired of doing aspect ratio calculations manually. With AspectMatic, you can calculate aspect ratios instantly and format them in multiple ways.

## Installation

1. **Copy the Plugin Manifest URL**  
   Click the link below to copy the manifest URL:  
   [AspectMatic Manifest URL](https://aspectmatic-penpot.netlify.app/manifest.json)  

2. **Open the Plugin Manager in Penpot**  
   - Use the keyboard shortcut: **Ctrl + Alt + P** (or **Cmd + Alt + P** on macOS).  
   - Alternatively, navigate to the **Plugins** section via the main menu.  

3. **Install the Plugin**  
   - Paste the copied URL into the text field in the Plugin Manager.  
   - Press **Enter** or click **Install**.  

4. **Verify Installation**  
   - Confirm that "AspectMatic" appears in your list of installed plugins.  

### Troubleshooting
- If you don’t see the Plugin Manager, ensure you’re using an up-to-date version of Penpot.  
- For self-hosted Penpot instances, check with your administrator to enable plugins.

## Features

1. Separator Options: Choose between colon (:) or slash (/) to format aspect ratios.

2. Ratio Formats:

   - Regular Ratio: A simple division format for width and height, such as 300:9 or 300/9.
   - Reduced Ratio: The simplified version of the regular ratio, like 100:3.
   - Decimal Form: The ratio expressed as a decimal number, such as 33.33.
   - Rounded Decimal Form: The decimal ratio rounded to the nearest whole number, such as 33.

3. Easy Copy: Quickly copy any aspect ratio to your clipboard for use in your designs.

4. User-Friendly Interface: Clean and intuitive UI designed to streamline the aspect ratio calculation process.

## How it works

1. Select Node(s): Click on one or more nodes in Penpot to start the aspect ratio calculation process.

2. Choose a Separator: Decide whether to use colon (:) or slash (/) as your ratio separator.

3. Select a Ratio Form: Pick from one of four ratio forms (Regular Ratio, Reduced Ratio, Decimal, or Rounded Decimal).

4. Generate and Copy: Click "Get AR" to calculate the aspect ratio(s). Easily copy the results for use in your projects.

## Contributing

Contributions are welcome! If you'd like to contribute to AspectMatic, please open a pull request or raise an issue in the repository.

## Local Development

1. **Clone the repository**:

   ```
   git clone https://github.com/Jemeni11/AspectMatic-Penpot.git
   ```

2. **Install dependencies**:

   ```
   pnpm install
   ```

3. **Build the plugin**:

   ```
   pnpm build
   ```

TBC


## Credits

[AspectMatic](https://aspectmatic-penpot.netlify.app/) was developed by Emmanuel Jemeni, a frontend developer.

Built with React, TypeScript, Prettier, and TailwindCSS.

If you find this plugin helpful and would like to support my work, feel free to support me on [GitHub Sponsors](https://github.com/sponsors/Jemeni11/) or [Buy Me A Coffee](https://www.buymeacoffee.com/jemeni11).

For any contributions or issues, check out the [AspectMatic repository](https://github.com/Jemeni11/AspectMatic-Penpot).

- LinkedIn: [Emmanuel Jemeni](https://www.linkedin.com/in/emmanuel-jemeni)
- GitHub: [@Jemeni11](https://www.github.com/Jemeni11)
- Twitter/X: [@Jemeni11\_](https://twitter.com/Jemeni11_)

## License

[GPL-3.0](/LICENSE)
