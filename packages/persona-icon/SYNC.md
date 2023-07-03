# Sync with Figma

1. Create `.env` file, you can copy from `.env.example`
   ```sh
   cp .env.example .env
   ```
2. On `.env`:
   1. Set `FIGMA_TOKEN` with your Figma's Persona Access Token, check [here](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens).
   2. Set `FIGMA_FILE_ID` with target Figma's file id, you can get it from url, after `https://www.figma.com/file/`
3. Run `yarn sync`
