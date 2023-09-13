// Função para fazer a requisição com Axios
function getJSONdata() {
  axios
    .get("http://localhost:8000/dadosNoFormatoJSON")
    .then((response) => {
      // Converter o objeto JSON em uma string e exibi-lo na tag <p>
      document.getElementById("JSONdata").textContent = JSON.stringify(
        response.data
      );
    })
    .catch(function (error) {
      console.error("Erro ao fazer a requisição:", error);
    });
}
// Função para fazer a requisição com Axios
function getImage() {
    axios
    .get("http://localhost:8000/static/cbum.jpeg")
    .then((response) => {
      const imageUrl = response.data.src;
      const imgElement = document.getElementById("imagemDoCBUM");
      imgElement.src = imageUrl;
      console.log('response.data.src: ' + JSON.stringify(response.data))
      console.log("Imagem obtida com sucesso:", imageUrl);
      console.log("response: " + JSON.stringify(response));
    })
    .catch(function (error) {
      console.error("Erro ao fazer a requisição:", error);
    });
}

// function getImage() {
//     axios.get('http://localhost:8000/image')
//         .then((response)=>{
//             console.log('imagem pega')
//             console.log('response: ' + JSON.stringify(response))
//             console.log('typeof(response.data): ' + typeof response.data)

//             const contentType = response.headers['content-type']; // Obtenha o tipo de conteúdo da resposta
//             const base64String = btoa(
//                 new Uint8Array(response.data).reduce(function (data, byte) {
//                     return data + String.fromCharCode(byte);
//                 }, '')
//             );            const imageUrl = `data:${contentType};base64,${base64String}`; // Crie uma URL de dados com os dados da imagem em base64
//             const imgElement = document.getElementById('imagemDoCBUM');
//             imgElement.src = imageUrl; // Define o src da tag <img> com a URL da imagem
//         })
//         .catch(function (error) {
//             console.error('Erro ao fazer a requisição:', error);
//         });
// }

function sendImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0]; // Obtenha o arquivo selecionado

  if (!file) {
    alert("Por favor, selecione um arquivo de imagem.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file); // Adicione o arquivo ao objeto FormData

  axios
    .post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Defina o cabeçalho apropriado para dados multipart/form-data
      },
    })
    .then((response) => {
      console.log("Response:", response);
      console.log("Response.data:", response.data);
      document.getElementById("imagemResponse").innerText = response.data;
    })
    .catch((error) => {
      console.error("Erro ao enviar a imagem:", error);
    });
}

function sendUserInfo() {
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;

  const data = { name, lastName, age };

  axios
    .post("http://localhost:8000/user", data)
    .then((res) => {
      document.getElementById("responseUser").innerText = res.data;
    })
    .catch((error) => {
      document.getElementById("responseUser").innerText = error;
    });
}

document.getElementById("button2").addEventListener("onclick", function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário (recarregar a página)
});

function sendUserInfoGet() {
  const name = document.getElementById("name2").value;
  const lastName = document.getElementById("lastName2").value;
  const age = document.getElementById("age2").value;

  const data = { name, lastName, age };

  axios
    .get(`http://localhost:8000/user/${name}/${lastName}/${age}`)
    .then((res) => {
      document.getElementById("responseUser2").innerText = res.data;
    })
    .catch((error) => {
      document.getElementById("responseUser2").innerText = error;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const responseElement = document.getElementById("response");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(form);

    axios
      .post("/user", Object.fromEntries(formData))
      .then(function (response) {
        responseElement.textContent = response.data;
      })
      .catch(function (error) {
        console.error("Erro ao fazer a requisição:", error);
      });
  });
});
