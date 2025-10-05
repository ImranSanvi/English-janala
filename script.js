

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then( (response) => response.json())
    .then( (json) => displayLesson(json.data));
};

const loadLevelWord = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then( (response => response.json()))
    .then(res => displayWord(res.data));
}

const displayWord = (allWord)=>{
    const wordContainer = document.getElementById('word-card-container')
    wordContainer.innerHTML = ""
    allWord.forEach(element => {
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
             <div class="card-1 flex flex-col gap-8 bg-white p-5 rounded-[5px] h-[100%] justify-end">
                <div class="flex flex-col items-center">
                    <h3 class="font-bold text-[32px]">${element.word}</h3>
                    <p class="font-medium text-[20px]">Meaning /Pronounciation</p>
                    <h3 class="font-semibold text-[32px]">${element.meaning} / ${element.pronunciation}</h3>
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

const displayLesson = (lesson) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    lesson.forEach(element => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML= `
            <button onclick="loadLevelWord(${element.level_no})" type="button" class="flex justify-center items-center gap-2 border-2 border-[#422AD5] px-2 py-1 rounded-[4px]"><img src="./assets/fa-book-open.png" alt=""><span class="font-semibold text-[14px] text-[#422AD5]">Lesson -${element.level_no}</span></button>
        `
        levelContainer.appendChild(btnDiv);
    });
}

loadLesson();