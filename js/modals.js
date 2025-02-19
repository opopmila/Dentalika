document.addEventListener("DOMContentLoaded", function() {
    const formModal = document.getElementById("formModal");
    const confirmModal = document.getElementById("confirm");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const closeBtns = document.querySelectorAll(".close");
    const submitBtn = document.getElementById("submitBtn");

    function openModal(modal) {
        modal.style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    openModalBtns.forEach(btn => {
        btn.onclick = function(event) {
            event.preventDefault();
            openModal(formModal);
        }
    });

    closeBtns.forEach(btn => {
        btn.onclick = function() {
            closeModal(formModal);
            closeModal(confirmModal);
        }
    });

    window.onclick = function(event) {
        if (event.target == formModal || event.target == confirmModal) {
            closeModal(formModal);
            closeModal(confirmModal);
        }
    }

    document.getElementById("feedbackForm").onsubmit = function(event) {
        event.preventDefault();
        console.log("Form submitted");
        closeModal(formModal);
        openModal(confirmModal);
    }
});
