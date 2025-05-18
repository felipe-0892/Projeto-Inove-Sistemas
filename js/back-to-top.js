        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            var backToTopButton = document.getElementById("back-to-top");
            
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = "flex";
            } else {
                backToTopButton.style.display = "none";
            }
        }

        // Quando o botão é clicado, voltar ao topo suavemente
        document.getElementById("back-to-top").addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });