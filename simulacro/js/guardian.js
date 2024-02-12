(() => {
    const privateRoutes = [
        "administrator.html"
    ];
    const isAuthenticated = localStorage.getItem("administrador");
    const path = window.location.pathname;
    const routeActu = path.substring(path.lastIndexOf('/') + 1);
    
    if (privateRoutes.includes(routeActu) && !isAuthenticated) {
        window.location.href = "404.html"
    }
}
)()