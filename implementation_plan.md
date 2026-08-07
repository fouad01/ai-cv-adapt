# Add Profile Picture Upload and Persist Settings

## Goal
Allow users to upload or change their profile picture, and ensure all user edits and settings are saved in the browser so they persist across visits.

## Proposed Changes

### 1. Profile Picture Upload
We will add an option to upload a custom profile picture.
- Add a new "Upload Photo" button in the sidebar under the "Design & layout" panel, right next to the "Show profile photo" switch.
- When an image is selected, we will automatically resize and compress it (e.g. max 200x200 pixels) to ensure the Base64 string is small enough to fit comfortably within the browser's 5MB `localStorage` limit.
- We will update `state.cv.personal.photo` with this Base64 string and re-render the CV preview.

### 2. Persisting Edits & Settings
Currently, your CV content edits (the text) *are* being saved to `localStorage`, but your **layout settings** (font size, margins, hidden sections, etc.) are reset to their default values every time you refresh the page.
- We will introduce a new `localStorage` key (`cv-adapt-settings`) to save your layout settings.
- Whenever you toggle a section, change the font size, or adjust margins, the new settings will be saved instantly.
- When the page loads, it will restore your exact settings and CV state.
- **Note on CV Text Edits**: Text changes in the CV are saved when you click outside the text box (on 'blur'). We will add an `input` listener to save text edits *immediately* as you type, so you never lose work even if you close the tab while still focused on a text box.

### `outputs/app.js`
#### [MODIFY] `outputs/app.js`
- **Initial State**: Update the `settings` object initialization to load from `localStorage.getItem('cv-adapt-settings')` if available.
- **Saving Settings**: Create a `saveSettings()` function and call it whenever a setting is changed in the `bind()` function.
- **Photo Upload UI**: Add `<label class="button secondary file-label" style="margin-top:10px;">Upload Custom Photo<input id="upload-photo" type="file" accept="image/*" style="display:none"/></label>` to the shell HTML.
- **Photo Upload Logic**: In `bind()`, add a change event for `#upload-photo` to read the file, draw it to a hidden `<canvas>` to scale it down, get the Data URL, save to `state.cv.personal.photo`, and render.
- **Immediate Saving**: Add an `input` event listener for `editHandler` alongside the `blur` event so that CV text edits are saved instantly as you type.

## Verification Plan
1. **Manual Verification**: Run the app locally, upload a custom picture, edit the text and change the layout settings, then refresh the page. The picture, text edits, and layout settings should all be perfectly restored.
