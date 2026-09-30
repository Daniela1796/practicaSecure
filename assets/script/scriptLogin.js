//Funciones de visualización para el formulario
const togglePwd = document.getElementById("togglePwd");
      const clave = document.getElementById("clave");
      togglePwd.addEventListener("click", () => {
        const isPwd = clave.type === "password";
        clave.type = isPwd ? "text" : "password";
        const newLabel = isPwd ? "Ocultar contraseña" : "Mostrar contraseña";
        togglePwd.textContent = isPwd ? "Ocultar" : "Mostrar";
        togglePwd.setAttribute("aria-label", newLabel);
      }); 

      //Proceso los datos del formulario 
      document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const correoInput = document.getElementById("usuario").value.trim();
        const claveInput = document.getElementById("clave").value;

        //guardo las variables en un objeto FormData
        const formData = new FormData();
        formData.append("correo", correoInput);
        formData.append("clave", claveInput);

        //realizo la petición al sript de authentication
        fetch("../backend/authentication.php",{
          method:"POST",
          body: formData
        })
        //recibo la respuesta del servidor y se transforma a JSON
        .then(res=>res.json())
        //interpreta la promesa
        .then(data =>{
          if(data.status === "ok"){
            //redirige al usuario al panel correspondiente
            window.location.href = data.redirect;
          }
          else{
            //Muestra el error que puede haber en las credenciales
            alert(data.mensaje);
          }
        })
        //Captura el error de conexión o procesamiento 
        .catch(err => console.error("error en login: ", err));
      });

      //Funciones de accesibilidad
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