//Elementos visuales del formulario
const togglePwd = document.getElementById("togglePwd");
const clave = document.getElementById("clave");

togglePwd.addEventListener("click", () => {
  const isPwd = clave.type === "password";
  clave.type = isPwd ? "text" : "password";
  const newLabel = isPwd ? "Ocultar contraseña" : "Mostrar contraseña";
  togglePwd.textContent = isPwd ? "Ocultar" : "Mostrar";
  togglePwd.setAttribute("aria-label", newLabel);
});

//1. Obtener los elementos del formulario de registro
document.getElementById("RegisterForm").addEventListener("submit", (e) => {
  e.preventDefault();
// 2 . Guardar los elementos del formulario en variables de .JS
  const usuarioInput = document.getElementById("nombre").value.trim();
  const correoInput = document.getElementById("correo").value.trim();
  const claveInput = document.getElementById("clave").value.trim(); 
  const rolInput = document.getElementById("rol").value.trim(); 
  const errorUsuario = document.getElementById("errorUsuario");

  // 3. Verificación inicial de si hay datos vacios o sin seleccionar como en el rol

  if (!rolInput) {
    errorUsuario.textContent = "Debes seleccionar un rol.";
    document.getElementById("rol").focus(); //muestra la seleccion inicial del usuario
    return;
  }

  //Vacía el mensaje de error
  errorUsuario.textContent = "";


  if (!usuarioInput || !correoInput || !claveInput) {
    alert("Por favor completa todos los campos.");
    return;
  }

  // 4. FormData es un objeto de JavaScript que empaqueta los datos como un
  //    formulario en donde cada par de nombres deben coincidir con lo que PHP lee en $_POST['nombre'], etc.
  const formData = new FormData();
  formData.append("nombre", usuarioInput);
  formData.append("correo", correoInput);
  formData.append("clave", claveInput);
  formData.append("rol", rolInput);


  //6. fetch función de JavaScript que envía la petición HTTP al backend
  //   con el método POST y los datos de formData en el cuerpo (body).
  fetch("../backend/verifyregister.php", {
    method: "POST",
    body: formData
  })
  //Recibe el "response" enviado por el servidor y .json() procesa el objeto y devuelve una promesa
  .then(response => response.json())
  //Recibe la promesa en formato JS para interpretarlo en el script
  .then(data => {
    if (data.status === "ok") {
      alert("Usuario registrado exitosamente");
      window.location.href = "login.html";
    } else {
      alert(data.mensaje);
    }
  })
  //Captura errores de red o excepciones al procesar la petición
  .catch(error => {
    console.error("Error en el registro:", error);
    alert("Hubo un problema al conectar con el servidor.");
  });
});

// Funciones de Accesibilidad (Se mantienen igual)
function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
  document.body.classList.remove("low-contrast");
}
function toggleLowContrast() {
  document.body.classList.toggle("low-contrast");
  document.body.classList.remove("high-contrast");
}
function increaseFont() {
  document.body.style.fontSize =
    parseInt(window.getComputedStyle(document.body).fontSize) + 2 + "px";
}
function decreaseFont() {
  document.body.style.fontSize =
    parseInt(window.getComputedStyle(document.body).fontSize) - 2 + "px";
}
function toggleAccessibilityModal() {
  const modal = document.getElementById("accessibilityModal");
  const isExpanded = modal.classList.contains("active");
  document
    .querySelector(".accessibility-toggle")
    .setAttribute("aria-expanded", !isExpanded);
  modal.classList.toggle("active");
}