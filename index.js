// We need to create a new iframe on every update, so that the JS state does not stick around. Example of a problem that would cause: When defining a variable in the top scope with "let", the second update fails.
function update()
{
    if (document.querySelector('#layout').value === 'edit only') return;
    let newIframe = document.createElement('iframe');
    document.body.replaceChild(
        newIframe,
        document.querySelector('#resulframe'),
    );
    newIframe.id='resulframe';
    let outty = newIframe.contentWindow.document;
    outty.open();
    let inny=document.getElementById("data");
    outty.write(inny.value);
    outty.close();
};

function goFullscreen()
{
    let outWin = window.open()
    outWin.focus();
    let outty = outWin.document;
    outty.open();
    let inny = document.getElementById("data");
    outty.write(inny.value);
    outty.close();
}

function realtime()
{
    if (!document.querySelector("#realtime").checked) return;
    update();
}

function render() {
    let outWin = window.open()
    outWin.focus();
    _render(outWin);
}

function clearData() {
    document.querySelector('#data').value = '';
    update();
}

function changeFontSize() {
    var fontSizeInput = document.getElementById("fontSize");
    var newSize = parseInt(fontSizeInput.value);
    if(isNaN(newSize)) {
        newSize = 14;
    }
    var textArea = document.getElementById("data");
    textArea.style.fontSize = newSize + "px";
}

function updateLayout() {
    let layout = document.querySelector('#layout').value;
    if (layout === 'horizontal') {
        document.body.classList.add("horizontal");
        document.body.classList.remove("edit_only");
    } else if (layout === 'edit only') {
        document.body.classList.add("edit_only");
        document.body.classList.remove("horizontal");
    } else {
        document.body.classList.remove("horizontal");
        document.body.classList.remove("edit_only");
    }
}

async function _render(outWin) {
    let inny = document.querySelector("iframe").contentDocument.body;
    let dataUrl = await domtoimage.toPng(inny);
    let img = document.createElement('img');
    img.src = dataUrl;
    outWin.document.body.appendChild(img);
}

let dataArea = document.getElementById("data");
dataArea.onkeyup = realtime;

update();
changeFontSize();
