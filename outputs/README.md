# CV Adapt

## Run locally on Windows

Open PowerShell in this folder and run:

```powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1
```

Then open the local URL shown by Vite, usually `http://localhost:5173`.

Use `npm.cmd` instead of `npm` when PowerShell script execution is restricted on Windows. Do not open `index.html` directly, because the app uses Vite modules and needs the local development server.

## Production build

```powershell
npm.cmd run build
```
