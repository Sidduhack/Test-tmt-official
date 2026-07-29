import { supabase } from "./config.js";

const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");
const button = document.getElementById("loginBtn");

const next =
  new URLSearchParams(window.location.search).get("next") ||
  "/index.html";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "";
  button.disabled = true;
  button.textContent = "Signing in...";

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value.trim(),
      password: password.value
    });

    if (error) throw error;

    window.location.href = next;

  } catch (err) {
    status.textContent = err.message;
    button.disabled = false;
    button.textContent = "Login";
  }
});
