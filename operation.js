// const renameItem = (folderList, itemId) => {
//     for (let item of folderList) {
//         if (item.id == itemId) {
//             let newName = prompt("Please enter a new name for the file/folder.");
//             let element = document.getElementById(itemId);
//             let parentItem = iterateDataForGettingParent(store, element.parentNode.id);
//             for(const child of parentItem.children){
//                 if(child.name === newName){
//                     alert("A folder/file with this name already exists in this folder. Please choose a different name.");
//                     return;
//                 }
//             }
//             console.log(element);
//             let childCount = element.childElementCount;
//             if(newName != null && newName != ""){
//                 console.log(checkFileName(newName));
//                 while(!checkFileName(newName)){
//                     window.alert("The name should be less than 10 characters and should not contain numbers.");
//                     newName = window.prompt("Please try again!");
//                 }
//                 item.name = newName;
//                 console.log(childCount);
//                 let requiredElement;
//                 if(childCount === 3){
//                     requiredElement = element.firstElementChild;
//                 }else{
//                     requiredElement = element.firstElementChild.nextElementSibling;
//                 }
//                 console.log(requiredElement);
//                 requiredElement.innerHTML = newName;
//             }
//             checkFileName("");
//         }
//         if (item.type == "folder") {
//             renameItem(item.children, itemId);
//         }
//     }
// }
// const iterateChildrenAndPush = (targetId, childrenArray, newItem) => {

//     for(let child of childrenArray){
//         if(targetId === child.id){
//             child.children.push(newItem)
//             return;
//         }

//         if(child.children != null){
//             iterateChildrenAndPush(targetId, child.children, newItem);
//         }
//     }
// }
const iterateChildrenForPrint = (mainDiv, childrenArray) => {

    for(let child of childrenArray){
        let childElement
        if(child.type === "file"){
            childElement = createFileElement(child.name, child);
        }
        else{
            childElement = createFolderElement(child.name, child);
        }
        mainDiv.appendChild(childElement);
        if(child.children != null){
            iterateChildrenForPrint(childElement.lastElementChild, child.children);
        }
    }
}
const iterateChildrenAndPush = (targetId, childrenArray, newItem) => {

 for(let child of childrenArray){
      if(targetId === child.id){
     child.children.push(newItem)
          return;
      }

       if(child.children != null){
          iterateChildrenAndPush(targetId, child.children, newItem);
      }
   }
 }
const iterateDataForGettingParent = (targetId, childrenArray) => {
    let result;
    for (let child of childrenArray) {
        if (targetId == child.id) {
            return child;
        }

        if (child.children != null) {
            result = iterateDataForGettingParent(targetId, child.children);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

const addFolder = (event) => {
    let inputValue = document.getElementById("InputValueId");
    let parentItem = iterateDataForGettingParent(event.parentNode.id, data);

    let childrenArray = parentItem.children;
    for(let child of childrenArray){
        if(child.name === inputValue.value){
            alert("The given name already exists.");
            return;
        }
    }
    let newItem = createFolderNode(parentItem, inputValue.value, "folder");

    iterateChildrenAndPush(parentItem.id, data, newItem);
    
    let mainDiv = document.getElementById("folderStructure");
    mainDiv.innerHTML = '';
    parentid = 0;

    iterateChildrenForPrint(mainDiv, data[0].children);
}

const addFile = (event) => {
    let inputValue = document.getElementById("InputValueId");
    
    let parentItem = iterateDataForGettingParent(event.parentNode.id, data);
    let newItem = createFileNode(parentItem, inputValue.value, "file");
    
    iterateChildrenAndPush(parentItem.id, data, newItem);

   
    let mainDiv = document.getElementById("folderStructure");
    mainDiv.innerHTML = '';
    parentid = 0;
    iterateChildrenForPrint(mainDiv, data[0].children);  
}

const deleteItem = (event) =>{
     let parentId = event.parentNode.parentNode.id;
    deleteNode(parentId, data, event.parentNode.id);
    let mainDiv = document.getElementById("folderStructure");
    mainDiv.innerHTML = '';
    parentid = 0;
    iterateChildrenForPrint(mainDiv, data[0].children);
}







