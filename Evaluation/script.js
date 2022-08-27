const api = (() => {
    const url = 'http://localhost:4232'
    const coursePath = '/courseList';
    const get = () => {
        return fetch(url + coursePath).then((response) => {
            return response.json()
        })
    }
    return {
        get
    }
})();

const View = (() => {
	const render = (element, tmp) => {
        element.innerHTML = tmp;
    }
    const focus = (element) => {
        if(element.style.backgroundColor === 'deepskyblue'){
            element.style.backgroundColor = null
        }else{   
            console.log(element)
            element.style.backgroundColor = 'deepskyblue'
        }
    }
    const toggleButton = () => {
        const element = document.querySelector('#submit')
        element.disabled = true;
    }
    const tmp = (data) => { //data is array
        let tmp = '';
        for(const entry of data){
            tmp += `
            <li class="course_list_item" id=${entry.courseId}>
                <div class="course_name">${entry.courseName}</div>
                <div class="course_type">${entry.required == 'true'? 'Compulsory': 'Elective'}</div>
                <div class="course_credit"> Course Credit: ${entry.credit}</div>
            </li>
            `
        }
        return tmp
    }
    const creditTmp = (credit) => {
        return `${credit}`
    }
	const selectorContainer = {
        credit: '#credit',
        submit: '#submit',

        courseList: '.course_list',
        selectedList: '.selected_list'
    }
	return{render, focus, toggleButton, tmp, creditTmp, selectorContainer}
})();

const Model = ((api, view) => {
    
	class State{
        #courseState = []; //courses listing
        #focusState = []; //courses being focused
        #credit = 0;
        #submitState = []; //courses selected and submitted

        get courseState(){
            return this.#courseState;
        } 
        set courseState(courses){
            this.#courseState = courses
            const tmp = view.tmp(this.#courseState);
            const element = document.querySelector(view.selectorContainer.courseList)
            view.render(element, tmp)
        }

        get focusState(){
            return this.#focusState;
        }
        set focusState(focus){
            console.log(+focus.id)
            if(this.#focusState.includes(+focus.id)){
                this.#focusState = [...this.#focusState.filter((id)=> id !== +focus.id)]
            }else{
                this.#focusState = [...this.#focusState, +focus.id];
            }
            view.focus(focus)
        }

        get credit(){
            return this.#credit
        }
        set credit(credit){
            this.#credit = credit
            const element = document.querySelector(view.selectorContainer.credit)
            const tmp = view.creditTmp(this.#credit)
            view.render(element, tmp)
        }
        get submitState(){
            return this.#submitState
        }
        set submitState(submitted){
            this.#submitState = submitted

            const tmp = view.tmp(this.#submitState);
            const element = document.querySelector(view.selectorContainer.selectedList)
            view.render(element, tmp)
            view.toggleButton()
        }

	}
    const {get, getCourse} = api;

	return {
        get,
        getCourse,
        State,
    }
})(api, View);





const Controller = ((model, view) => {
    const state = new model.State(); //instance of state
	const init = () => {
        model.get().then((data)=>{
            state.courseState = data
            state.credit = 0
        })
    }
    const focusCourse = () => {
        const element = document.querySelector(view.selectorContainer.courseList)
        element.addEventListener('click', eventHandler)
        let target = undefined;
        function eventHandler(event){
            if(event.target.className === "course_list_item"){
                target = event.target;
            }else{
                target = event.target.parentElement;
            }
            
            
            if(!state.focusState.includes(state.courseState[target.id - 1].courseId)){
                console.log(state.courseState[target.id - 1].credit + state.credit)
                if((state.courseState[target.id - 1].credit + state.credit) > 18){
                    alert("You can only choose up to 18 credits in one semester")
                }else{
                    state.credit += state.courseState[target.id - 1].credit
                    state.focusState = target
                }
                
            }else if(state.focusState.includes(state.courseState[target.id - 1].courseId)){
                console.log(state.focusState)
                state.credit -= state.courseState[target.id - 1].credit
                state.focusState = target
            }
            
        }
    }
    const submit = () => {
        const element = document.querySelector(view.selectorContainer.submit)
        element.addEventListener('click', eventHandler)
        function eventHandler(){
            if(confirm(`You have chosen ${state.credit} credits for this semester. You cannot change once you submit. Do you want to confirm?`)){
                state.submitState = state.courseState.filter((course)=>{
                    return state.focusState.includes(course.courseId)
                })
                state.courseState = state.courseState.filter((course)=>{
                    return !state.focusState.includes(course.courseId)
                })

            }
        }
    }
    const bootstrap = () => {
        init();
        focusCourse();
        submit();
    }
	return {bootstrap}
})(Model, View);

console.log("in script")
Controller.bootstrap()