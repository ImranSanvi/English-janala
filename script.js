

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then( (response) => response.json())
    .then( (json) =>  displayLesson(json.data));
};

const loadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then( (response => response.json()))
    .then(res =>{
        removeActive();
        const lessonBtn = document.getElementById(`lesson-btn-${id}`)
        lessonBtn.classList.add("active");
        displayWord(res.data)
    });
}

const displayWord = (allWord)=>{
    const wordContainer = document.getElementById('word-card-container')
    wordContainer.innerHTML = ""

    if(allWord.length == 0){
        wordContainer.innerHTML=`
            <div class="lesson-7 bg-[#F8F8F8] mx-[80px] flex flex-col gap-3 justify-center items-center py-[80px] col-span-full">
                <img src="./assets/alert-error.png" alt="">
                <p class="font-bangla text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla font-medium text-[35px] text-[#292524]">নেক্সট Lesson এ যান</h2>
            </div>
        `
    }

    else{

        allWord.forEach(element => {
            const wordDiv = document.createElement('div')
            wordDiv.innerHTML = `
                <div class="card-1 flex flex-col gap-8 bg-white p-5 rounded-[5px] h-[100%] justify-end">
                    <div class="flex flex-col items-center">
                        <h3 class="font-bold text-[32px]">${element.word ? element.word : "word not found"}</h3>
                        <p class="font-medium text-[20px]">Meaning /Pronounciation</p>
                        <h3 class="font-semibold text-[32px]">${element.meaning ? element.meaning: "meaning not found"} / ${element.pronunciation ? element.pronunciation : "pronunciation not found"}</h3>
                    </div>
                    <div class="flex justify-between">
                        <button class="bg-[#1A91FF]/10 hover:bg-[#1A91FF] w-[56px] h-[56px] rounded-[5px] flex items-center justify-center"><img src="./assets/fa-circle-question.png" alt=""></button>
                        <button class="bg-[#1A91FF]/10 hover:bg-[#1A91FF] w-[56px] h-[56px] rounded-[5px] flex items-center justify-center"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `
            wordContainer.appendChild(wordDiv)
        });
    }
        
    
}

const removeActive= ()=>{
    const lessonBtn = document.querySelectorAll('.lesson-btn')
    lessonBtn.forEach( (btn) => btn.classList.remove("active"))
}

const displayLesson = (lesson) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    lesson.forEach(element => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML= `
            <button id="lesson-btn-${element.level_no}" onclick="loadLevelWord(${element.level_no})" type="button" class="lesson-btn hover:bg-blue-400 flex justify-center items-center gap-2 border-2 border-[#422AD5] px-2 py-1 rounded-[4px]"><img class="btn-primary" src="./assets/fa-book-open.png" alt=""><span class="font-semibold text-[14px] btn-primary">Lesson -${element.level_no}</span></button>
        `
        levelContainer.appendChild(btnDiv);
    });
}

loadLesson();