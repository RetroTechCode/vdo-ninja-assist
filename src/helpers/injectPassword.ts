export default function injectPassword() {
  const VALUE = "";
  const INPUT_SELECTOR = 'input.largeTextEntry[type="password"][data-pid]';

  const waitFor = <T extends Element = Element>(
    sel: string,
    pollMs = 50,
    maxTries = 200
  ): Promise<T> =>
    new Promise((resolve, reject) => {
      let tries = 0;
      const timer = setInterval(() => {
        const el = document.querySelector(sel);
        if (el) {
          clearInterval(timer);
          return resolve(el as T);
        }
        if (++tries > maxTries) {
          clearInterval(timer);
          reject(`Timeout: ${sel}`);
        }
      }, pollMs);
    });

  async function autofillAndSubmit() {
    console.log("[auto-submit] Starting...");

    try {
      const pwdInput = await waitFor<HTMLInputElement>(INPUT_SELECTOR);
      console.log("[auto-submit] Password input found");
      const pid = pwdInput.dataset.pid;
      pwdInput.focus();
      pwdInput.value = VALUE;
      ["input", "change"].forEach((evt) =>
        pwdInput.dispatchEvent(new Event(evt, { bubbles: true }))
      );
      const btn = await waitFor<HTMLButtonElement>(
        `button[data-pid="${pid}"][type="submit"]`
      );
      console.log("[auto-submit] Submit button found, clicking...");
      btn.click();
    } catch (err) {
      console.error("[auto-submit] Error:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", autofillAndSubmit);
  } else {
    autofillAndSubmit();
  }

  return true;
}
