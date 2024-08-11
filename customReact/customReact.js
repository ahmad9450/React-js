
function customRender (reactElement, container){
  let element = document.createElement(reactElement.type);
  element.innerHTML= reactElement.children;
  for(let prop in reactElement.props){
    element.setAttribute(prop,reactElement.props[prop]);
  }
  container.appendChild(element);
}

const reactElement = {
  type : "a",
  props:{
    href:"http://google.com",
    target : "main",
    style: "text-decoration : none;",
  },
  children:"Visit google"
}


const root = document.querySelector("#root");

customRender(reactElement,root)