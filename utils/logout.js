export function logout() {
    const button = document.querySelector(".saindo")
    button.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.reload()
    })
}