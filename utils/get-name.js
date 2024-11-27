export async function getName() {
    const token = localStorage.getItem("token")

    if(!token) {
        return
    }

    const response = await fetch("http://localhost:3000/getname", {
        headers: {
            "Authorization": token
        }
    }).then(response => response.json())

    const nameP = document.querySelector(".usuarioo")
    nameP.innerText = `Usuário: ${response.name}`
}