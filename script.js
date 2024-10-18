
const textarea = document.getElementById('markdown-input');
const preview = document.getElementById('markdown-preview');
const { jsPDF } = window.jspdf; 
window.onload = ()=>{
    
    let markdownText = 
    "## Test.md\n"+
    "\n"+
    "# Header 1\n" +
    "## Header 2\n" +
    "### Header 3\n" +
    "#### Header 4\n" +
    "##### Header 5\n" +
    "###### Header 6\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## Emphasis\n" +
    "\n" +
    "*Italic* text with asterisks.\n" +
    "\n" +
    "_Italic_ text with underscores.\n" +
    "\n" +
    "**Bold** text with double asterisks.\n" +
    "\n" +
    "___Bold and Italic___ text with triple underscores.\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## Lists\n" +
    "\n" +
    "### Unordered List\n" +
    "- Item 1\n" +
    "- Item 2\n" +
    "  - Subitem 2.1\n" +
    "    - Subitem 2.1.1\n" +
    "  - Subitem 3.1\n" +
    "  - Subitem 2.2\n" +
    "- Item 3\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## Images\n" +
    "\n" +
    "![Sample Image](https://picsum.photos/300/300)\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## Blockquotes\n" +
    "\n" +
    "> This is a blockquote. It can span multiple lines.\n" +
    "\n" +
    "> It is often used to quote someone else's work or a notable statement.\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## Code\n" +
    "\n" +
    "### Inline Code\n" +
    "Here is some `inline code` within a sentence.\n" +
    "\n" +
    "### Code Block\n\n" +
    "```javascript\n" +
    "const greet = () => {\n" +
    "    console.log(\"hello world\");\n" +
    "}\n" +
    "greet();\n" +
    "```\n" +
    "\n" +
    "```\n\n" +
    "def greet():\n" +
    "    print(\"hello \")\n" +
    "```\n" +
    "\n" +
    "### Table\n" +
    "\n" +
    "| Column 1   | Column 2   | Column 3   |\n" +
    "|------------|------------|------------|\n" +
    "| Row 1 Col 1| Row 1 Col 2| Row 1 Col 3|\n" +
    "| Row 2 Col 1| Row 2 Col 2| Row 2 Col 3|\n" +
    "\n" +
    "### Horizontal Rule\n" +
    "---\n" +
    "\n" +
    "This line separates sections.\n" +
    "\n" +
    "---\n" +
    "\n" +
    "## Task List\n" +
    "\n" +
    "- [x] Complete the Markdown tutorial\n" +
    "- [ ] Write documentation\n" +
    "- [ ] Submit the project\n";

    $('#markdown-input')[0].value = markdownText;
    $('#markdown-preview').html(marked.parse(markdownText));
    $('#markdown-preview pre').addClass('language-javascript'); 
    Prism.highlightAll();
}


$('#markdown-input').on('input', ()=>{
    const markdownText = textarea.value;
    $('#markdown-preview').html(marked.parse(markdownText));
    $('#markdown-preview pre').addClass('language-javascript'); 
    Prism.highlightAll();
})


$('#markdown-input').on('scroll', () => {
    $('#markdown-preview').scrollTop($(this).scrollTop());
    $('#markdown-preview').scrollLeft($(this).scrollLeft());
});

$('#markdown-preview').on('scroll', () => {
    $('#markdown-input').scrollTop($(this).scrollTop());
    $('#markdown-input').scrollLeft($(this).scrollLeft());
});


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
        await html2pdf().from(clone).save('Markdown.pdf');
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