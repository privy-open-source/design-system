# PSPDFKit for Web

**Document Viewing and Editing in the Browser**

PSPDFKit for Web is a secure [JavaScript PDF library](https://pspdfkit.com/guides/web/) for viewing, annotating, and editing PDFs, Office documents, TIFFs, JPGs, and PNGs directly in the browser. It offers developers a way to quickly add document and image functionality to any web application. It's fully compatible with React, Angular, Vue.js, Svelte, and any other JavaScript or TypeScript framework.

- **Customizable** — Robust API for configuring behavior and appearance
- **Client Side** — Workload is offloaded to client (no server needed)
- **Secure** — Battle-tested, reliable PDFium-based PDF rendering engine
- **Office Document Support** — View and convert Office documents without third-party dependencies

<img src="https://pspdfkit.com/images/intercom/pspdfkit-npm.png" alt="Image showcasing the popular features of PSPDFKit for Web" width="100%" />

## Getting Started

The guide below explains how to integrate PSPDFKit for Web into a Vanilla JavaScript project. For other scenarios, refer to the [step-by-step guides](https://pspdfkit.com/getting-started/web/?utm_source=npm&utm_medium=referral&utm_campaign=readme).

1. Go to your project's root folder, and run the following command in the terminal. It installs the PSPDFKit npm package and adds it as a project dependency:

```npm
npm install --save pspdfkit
```

2. Run the following command to copy the PSPDFKit for Web distribution to the `assets` directory in your project’s root folder:

```bash
cp -R ./node_modules/pspdfkit/dist/ ./assets/
```

3. Rename the PDF document you want to display in your application to `document.pdf`, and then add the PDF document to your project’s root directory. You can use [this demo document](https://pspdfkit.com/downloads/pspdfkit-web-demo.pdf) as an example.

4. Add an empty `<div>` element with a defined width and height to where PSPDFKit will be mounted:

```html
<div id="pspdfkit" style="width: 100%; height: 100vh;"></div>
```

5. Add the following code to the main JavaScript file of your application. This imports and instantiates PSPDFKit for Web:

```js
import "./assets/pspdfkit.js";

const baseUrl = `${window.location.protocol}//${window.location.host}/assets/`;

PSPDFKit.load({
	baseUrl,
	container: "#pspdfkit",
	document: "document.pdf"
})
```

## Web Demos

- [Document Viewing](https://pspdfkit.com/demo/viewer?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Adding Annotations](https://pspdfkit.com/demo/annotations?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Filling PDF Forms](https://pspdfkit.com/demo/forms?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Instant Collaboration](https://pspdfkit.com/demo/instant-collaboration?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Digital Signatures](https://pspdfkit.com/demo/signatures?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Document Editing](https://pspdfkit.com/demo/editor?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- And [more](https://pspdfkit.com/demo/?utm_source=npm&utm_medium=referral&utm_campaign=readme)

## File Type Support

PSPDFKit for Web enables client-side viewing and conversion of PDF, Word, Excel, PowerPoint, TIFF, JPG, and PNG files directly on any browser — no server dependencies or MS Office licenses required. 

- PDF, PDF/A (1, 2, 3, 4)
- DOCX, DOC, DOTX, DOCM, XLSX, XLS, XLSM, PPTX, PPT, PPTM
- PNG, JPEG, JPG, TIFF, TIF

## Browser Support

PSPDFKit for Web supports the latest versions of all commonly used browsers: Chrome, Mozilla Firefox, Safari, Edge, and Firefox ESR.

## Integrations

PSPDFKit for Web is compatible with Salesforce, SharePoint, Microsoft Teams, and Microsoft OneDrive.

## Documentation

PSPDFKit offers comprehensive [guides](https://pspdfkit.com/guides/web/?utm_source=npm&utm_medium=referral&utm_campaign=readme) and [code samples](https://pspdfkit.com/guides/web/samples/?utm_source=npm&utm_medium=referral&utm_campaign=readme) to help you quickly integrate and customize your application. It comes with [full technical support](http://pspdfkit.com/support/request/?utm_source=npm&utm_medium=referral&utm_campaign=readme) that includes direct access to the engineers who built the product. Whether you have questions getting started or you want to know how to best integrate new features into your app, we’re here to help you find a solution.

Most popular guides:

- [PDF Viewer](https://pspdfkit.com/guides/web/viewer/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Office Conversion](https://pspdfkit.com/guides/web/conversion/office-to-pdf/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Annotation](https://pspdfkit.com/guides/web/annotations/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Forms](https://pspdfkit.com/guides/web/forms/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Signatures](https://pspdfkit.com/guides/web/signatures/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Editor](https://pspdfkit.com/guides/web/editor/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [PDF Generation](https://pspdfkit.com/guides/web/pdf-generation/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Conversion](https://pspdfkit.com/guides/web/conversion/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Extraction](https://pspdfkit.com/guides/web/extraction/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Redaction](https://pspdfkit.com/guides/web/redaction/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Document Security](https://pspdfkit.com/guides/web/document-security/?utm_source=npm&utm_medium=referral&utm_campaign=readme)
- [Search](https://pspdfkit.com/guides/web/search/?utm_source=npm&utm_medium=referral&utm_campaign=readme)

## API

[Read the full API reference](https://pspdfkit.com/api/web/PSPDFKit.html).

## Changelog

For a detailed list of the changes included in each version, please see the [changelog](https://pspdfkit.com/changelog/web/?utm_source=npm&utm_medium=referral&utm_campaign=readme).

## License and Support

PSPDFKit is a commercial product that offers a [free trial license](https://pspdfkit.com/try/) to evaluate and integrate it into your product. Visit our [pricing page](https://pspdfkit.com/pricing/) to learn more about licensing our solution.

Copyright © 2010-2024 PSPDFKit GmbH.
