const textarea = document.getElementById('markdown-input');
const preview = document.getElementById('markdown-preview');
const { jsPDF } = window.jspdf; 
// jQuery.fn.exists = function(){
//     return this.length>0;
// }

$('#markdown-input').on('input', ()=>{
    const markdownText = textarea.value;
    $('#markdown-preview').html(marked.parse(markdownText));
    $('#markdown-preview pre').addClass('language-javascript'); 
    Prism.highlightAll();
})


$('#markdown-input').on('scroll', function() {
    $('#markdown-preview').scrollTop($(this).scrollTop());
    $('#markdown-preview').scrollLeft($(this).scrollLeft());
});

$('#markdown-preview').on('scroll', function() {
    $('#markdown-input').scrollTop($(this).scrollTop());
    $('#markdown-input').scrollLeft($(this).scrollLeft());
});


// $('.ExportButton').click(()=> {
//     console.log('clicked');
//     $('.Options').toggleClass('active');
//     const html = $('#markdown-preview').html();
//     if(html.length > 0){
//         const blob = new Blob([html], { type: 'text/html' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'markdown.html';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     }
// })

$(".ExportButton").click(function(){
    $('.Options').toggleClass('active');
    $('.ExportButton ion-icon').toggleClass('ActiveIcon');
});


const DownloadHTML = ()=>{
    const html = $('#markdown-preview').html();
    if(html.length <= 0){
        alert('Markdown is empty.');
        return;
    }

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markdown.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const DownloadPDF = async ()=>{
    if($('#markdown-preview').html() <= 0){
        alert('Markdown is empty.');
        return;
    }
    const element = $('#markdown-preview')[0];
    const clone = element.cloneNode(true);
    const styles = window.getComputedStyle(element);

    for (let style of styles) {
        clone.style[style] = styles[style];
    }

    try {
        await html2pdf().from(clone).save('document.pdf');
        console.log("PDF Downloaded");
    } catch (err) {
        console.error("PDF Generation Error: ", err);
        alert(`PDF Generation Error: ${err.message || err}`);
    }
}


const Clear = ()=>{
    $('#markdown-input')[0].value = '';
    $('#markdown-preview').html('');
}

const Copy = () => {
    const content = $('#markdown-preview').html();

    const textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea); 
    textarea.select(); 

    document.execCommand('copy');

    document.body.removeChild(textarea);

    alert('Content copied to clipboard!');
};