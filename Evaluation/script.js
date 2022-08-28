// -----------------------API------------------------------
const api = (() => {
    const url = 'http://localhost:4232'
    const coursePath = '/courseList';
    const get = () => {
        return fetch(url + coursePath)
                    .then((response) => response.json())
    }
    return {
        get
    }
})();

// -----------------------View----------------------------
const View = (() => {
    //render object contains all functions that triggers rendering
    const render = {
        elementHtml: (element, tmp) => {
            element.innerHTML = tmp;
        },
        focus: (element) => {
            if(element.style.backgroundColor === 'deepskyblue'){
                element.style.backgroundColor = null
            }else{   
                element.style.backgroundColor = 'deepskyblue'
            }
        },
        confirm: (credit) => {
            return confirm(`You have chosen ${credit} credits for this semester. You cannot change once you submit. Do you want to confirm?`)
        },
        disableButton: (element) => {
            element.disabled = true;
        },
    }
    //tmp object contains functions that create templates used in render
    const tmp = {
        courseTmp: (data) => {
            let tmp = '';
            for(const entry of data){
                tmp += `
                <li class="course_list_item" id=${entry.courseId}>
                    <div class="course_name">${entry.courseName}</div>
                    <div class="course_type">${(entry.required === true)? 'Course Type: Compulsory': 'Course Type: Elective'}</div>
                    <div class="course_credit"> Course Credit: ${entry.credit}</div>
                </li>
                `
            }
            return tmp
        },
        creditTmp: (credit) => {
            return `${credit}`
        }
        
    }
    //selector strings 
	const selectorContainer = {
        credit: '#credit',
        submit: '#submit',
        courseList: '.course_list',
        selectedList: '.selected_list'
    }
	return{render, tmp, selectorContainer}
})();

// --------------------------Model----------------------------
const Model = ((api, view) => {
    const {get} = api;
	class State{
        //private properties for storing data
        #courseState = []; //courses listing [{}, {}, ...]
        #focusState = []; //courses being focused [id1, id2, ...]
        #submitState = []; //courses selected and submitted [{}, {}, ...]
        #credit = 0; //number of current credit
        //getters
        get courseState(){
            return this.#courseState;
        }
        get focusState(){
            return this.#focusState;
        }
        get credit(){
            return this.#credit
        }
        get submitState(){
            return this.#submitState
        }
        //setters 
        set courseState(courses){
            this.#courseState = courses
            //update view
            const tmp = view.tmp.courseTmp(this.#courseState);
            const element = document.querySelector(view.selectorContainer.courseList)
            view.render.elementHtml(element, tmp)
        }
        set focusState(focusing){
            this.#focusState = focusing;
        }
        set credit(credit){
            this.#credit = credit
            //update view
            const element = document.querySelector(view.selectorContainer.credit)
            const tmp = view.tmp.creditTmp(this.#credit)
            view.render.elementHtml(element, tmp)
        }
        set submitState(submitted){
            this.#submitState = submitted;
            //update view
            const tmp = view.tmp.courseTmp(this.submitState);
            const element = document.querySelector(view.selectorContainer.selectedList)
            view.render.elementHtml(element, tmp)
            const button = document.querySelector('#submit')
            view.render.disableButton(button)
        }
        //functions to perform data logic
        updateFocus = (target)=>{
            const [course] = this.courseState.filter((obj) => {
                return (obj.courseId === +target.id)
            })
            if(!this.#focusState.includes(+target.id)){
                if((course.credit + this.credit) > 18){
                    alert("You can only choose up to 18 credits in one semester")
                }else{
                    this.credit += course.credit
                    this.#focusState = [...this.focusState, +target.id];
                    view.render.focus(target)
                }
            }else{
                this.credit -= course.credit
                this.#focusState = [...this.focusState.filter((num)=> num !== +target.id)]
                view.render.focus(target)
            }
        }
        attemptSubmit = (data) => {
            if(view.render.confirm(this.credit)){
                this.submitState = this.courseState.filter((course)=>{
                    return data.includes(course.courseId)
                })
                this.courseState = this.courseState.filter((course)=>{
                    return !data.includes(course.courseId)
                })
            }   
        }
	}

	return {
        get,
        State,
    }
})(api, View);

// --------------------------Controller----------------------------
const Controller = ((model, view) => {
    const state = new model.State(); 

	const init = () => {
        model.get().then((data)=>{
            state.courseState = data
            state.credit = 0
        })
    }
    const focusCourse = () => {
        const element = document.querySelector(view.selectorContainer.courseList)
        element.addEventListener('click', eventHandler)
        
        function eventHandler(event){
            let target = null;
            if(event.target.className === "course_list_item"){
                target = event.target;
            }else{
                target = event.target.parentElement;
            }
            state.updateFocus(target)
        }
    }
    const submitCourses = () => {
        const element = document.querySelector(view.selectorContainer.submit)
        element.addEventListener('click', eventHandler)
        function eventHandler(){
            state.attemptSubmit([...state.focusState])
        }
    }
    const bootstrap = () => {
        init();
        focusCourse();
        submitCourses();
    }
	return {bootstrap}
})(Model, View);

Controller.bootstrap()