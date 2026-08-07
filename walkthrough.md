# Feature Update: Custom Photos & Persistent Settings

I've successfully implemented your requested features. Your CV app will now behave much more like a persistent web application. 

## What changed

### 1. Custom Profile Picture Upload
- There is a new **"Upload Custom Photo"** button located directly beneath the "Show profile photo" switch in the **Design & layout** sidebar panel.
- When you upload a photo, the app automatically resizes and optimizes it (scaling it down if it's too large) and converts it to a browser-friendly data string. This guarantees you won't run out of browser storage space.
- Once uploaded, your custom picture is saved in your CV data and persists across visits.

### 2. Persistent Layout Settings
- All your layout choices are now saved instantly. This includes:
  - Font size, margins, and line spacing
  - Toggles for hiding/showing contact information (LinkedIn, Phone, etc.)
  - Toggles for hiding entire sections (Summary, Skills, etc.)
  - The "Show profile photo" toggle
- If you close the tab and return later, your CV will load with exactly the same layout settings you left it with.

### 3. Safer Text Editing
- Previously, your text edits on the CV were only saved when you clicked *outside* the text field. 
- I added a real-time `input` listener. Now, every single keystroke is saved immediately as you type it. You can confidently close the tab mid-sentence without losing any progress.

> [!TIP]
> The code has already been pushed to your GitHub repository (`main` branch) and Netlify will automatically deploy this new version within the next minute. Just refresh your live website to see the new upload button!
