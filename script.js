

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then( (response) => response.json())
    .then( (json) =>  displayLesson(json.data));
};

const loadLevelWord = (id)=>{
    manageSpinner(true);
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

const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

const displayWordDetails = (word) =>{
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `
        <div class="p-5 border-1 border-green-300 p-4 rounded-[5px] shadow-lg">
            <h2 class="font-semibold text-[36px]">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
            <h4 class="font-semibold text-[24px] mt-3">Meaning</h4>
            <p class="font-medium text-[24px] mt-2">${word.meaning}</p>
            <h4 class="font-semibold text-[24px] mt-3">Example</h4>
            <p class="text-[24px] mt-2">${word.sentence}</p>
            <h4 class="font-medium text-[24px] mt-2">সমার্থক শব্দ গুলো</h4>
            <div class="button flex gap-5 mt-2">
                ${word.synonyms
                .map(syn => `<button class="btn btn-active btn-accent">${syn}</button>`)
                .join('')}
            </div>

        </div>  
    `
    document.getElementById("my_modal_5").showModal();
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
        manageSpinner(false);
        return;
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
                        <button onclick="loadWordDetail(${element.id})" class="bg-[#1A91FF]/10 hover:bg-[#1A91FF] w-[56px] h-[56px] rounded-[5px] flex items-center justify-center"><img src="./assets/fa-circle-question.png" alt=""></button>
                        <button class="bg-[#1A91FF]/10 hover:bg-[#1A91FF] w-[56px] h-[56px] rounded-[5px] flex items-center justify-center"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            `
            wordContainer.appendChild(wordDiv)
        });
        manageSpinner(false);
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

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-card-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}



loadLesson();


document.getElementById("btn-search").addEventListener("click", (event)=>{
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then( (response) => response.json())
    .then( (element) => {
        const allWords = element.data
        const filterWords = allWords.filter((data) => data.word.toLowerCase().includes(searchValue));
        displayWord(filterWords);
    })
});