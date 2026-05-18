/* =====================================================
   TAB MENU
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab, index) => {

        tab.addEventListener("click", function () {

            tabs.forEach(btn => {
                btn.classList.remove("active");
            });

            contents.forEach(content => {
                content.classList.remove("active");
            });

            tab.classList.add("active");
            contents[index].classList.add("active");

        });

    });

});


/* =====================================================
   PILIH JAWABAN - EKSPLORASI
===================================================== */

function selectAnswer(button, correct){

    const parent = button.parentElement;

    parent.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    parent.dataset.correct = correct;

}


/* =====================================================
   PILIH JAWABAN - GEO GAME
===================================================== */

function selectGameAnswer(button, correct){

    const parent = button.parentElement;

    parent.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    parent.dataset.correct = correct;

}


/* =====================================================
   CEK HASIL
===================================================== */

function showResults(){

    let score = 0;

    const groups =
    document.querySelectorAll(".answer-buttons");

    const totalQuestions =
    groups.length;

    let unanswered = false;


    /* =====================================================
       CEK DULU APAKAH ADA SOAL BELUM DIJAWAB
    ===================================================== */

    groups.forEach(group => {

        if(
            group.dataset.correct === undefined ||
            group.dataset.correct === ""
        ){

            unanswered = true;
        }

    });


    /* =====================================================
       JIKA MASIH ADA YANG KOSONG
    ===================================================== */

if(unanswered){

    groups.forEach(group => {

        const result =
        group.parentElement.querySelector(".result");

        const explanation =
        group.parentElement.querySelector(".explanation");

        /* jika belum dijawab */
        if(
            group.dataset.correct === undefined ||
            group.dataset.correct === ""
        ){

            result.innerHTML =
            "⚠ Soal belum dijawab";

            result.className =
            "result wrong";

            /* penjelasan tetap disembunyikan */
            if(explanation){

                explanation.style.display = "none";
            }

        }

        else{

            /* soal yang sudah dijawab tetap kosong */
            result.innerHTML = "";
        }

    });


    document.getElementById("motivation-text")
    .innerHTML =
    "⚠ Masih ada soal yang belum dijawab. Jawab semua soal terlebih dahulu.";

    document.getElementById("score-text")
    .innerHTML =
    "Poin Kamu: -";

    return;
}


    /* =====================================================
       JIKA SEMUA SUDAH DIJAWAB
    ===================================================== */

    groups.forEach(group => {

        const result =
        group.parentElement.querySelector(".result");

        const explanation =
        group.parentElement.querySelector(".explanation");

        const correct =
        group.dataset.correct === "true";

        const isGame =
        group.closest(".game-question");


        /* tampilkan penjelasan */
        if(explanation){

            explanation.style.display = "block";
        }


        /* =========================
           BENAR
        ========================== */

        if(correct){

            score++;

            if(isGame){

                result.innerHTML =
                "😎 Wahh Hebat! Jawaban kamu benar.";

            }

            else{

                result.innerHTML =
                "✔ Jawaban Benar";
            }

            result.className =
            "result correct";
        }


        /* =========================
           SALAH
        ========================== */

        else{

            if(isGame){

                result.innerHTML =
                "😢 Upss Salah";

            }

            else{

                result.innerHTML =
                "✘ Jawaban Salah";
            }

            result.className =
            "result wrong";
        }

    });


    /* =====================================================
       HITUNG NILAI
    ===================================================== */

    let finalScore =
    Math.round((score / totalQuestions) * 100);


    document.getElementById("score-text")
    .innerHTML =
    "Poin Kamu: " + finalScore;


    /* =====================================================
       MOTIVASI
    ===================================================== */

    const motivation =
    document.getElementById("motivation-text");


    if(finalScore >= 80){

        motivation.innerHTML =
        "🔥 Hebat! Kamu sudah memahami materi perbandingan trigonometri dengan sangat baik.";

    }

    else if(finalScore >= 50){

        motivation.innerHTML =
        "👍 Bagus! Pemahamanmu sudah cukup baik. Terus berlatih agar semakin mahir.";

    }

    else{

        motivation.innerHTML =
        "📚 Jangan menyerah. Pelajari kembali materi dan coba eksplorasi GeoGebra lagi ya!";
    }

}

/* =====================================================
   RESET QUIZ
===================================================== */

function resetQuiz(){

    /* reset pilihan tombol */
    const buttons =
    document.querySelectorAll(".answer-buttons button");

    buttons.forEach(button => {
        button.classList.remove("selected");
    });


    /* reset data jawaban */
    const groups =
    document.querySelectorAll(".answer-buttons");

    groups.forEach(group => {

        group.dataset.correct = "";

    });


    /* reset hasil benar/salah */
    const results =
    document.querySelectorAll(".result");

    results.forEach(result => {

        result.innerHTML = "";
        result.className = "result";

    });


    /* sembunyikan penjelasan jawaban */
    const explanations =
    document.querySelectorAll(".explanation");

    explanations.forEach(exp => {

        exp.style.display = "none";

    });


    /* reset poin */
    document.getElementById("score-text")
    .innerHTML =
    "Poin Kamu: 0";


    /* reset motivasi */
    document.getElementById("motivation-text")
    .innerHTML =
    "Semangat belajar perbandingan trigonometri!";

}
