$(()=>{

    /* Loaded via <script> tag, create shortcut to access PDF.js exports.*/
    var pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;

    /* The workerSrc property shall be specified.*/
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdfjs-dist/build/pdf.worker.min.js';

    var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    /*        scale = 0.8,*/
    scale = 1.5,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d'),
    $progress_page = $('#progress_page');

    $progress_page.bind('change', ()=>{
        pageNum = parseInt($progress_page.val());
        queueRenderPage(pageNum);
    });
    /*
    * Get page info from document, resize canvas accordingly, and render page.
    * @param num Page number.
    */
    function renderPage(num) {
        pageRendering = true;
        /* Using promise to fetch the page*/
        pdfDoc.getPage(num).then(function(page) {
            var viewport = page.getViewport(scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            /* Render PDF page into canvas context*/
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            var renderTask = page.render(renderContext);

            /* Wait for rendering to finish*/
            renderTask.promise.then(function() {
                pageRendering = false;
                $('#imagem').attr('src', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
                if (pageNumPending !== null) {
                    /* New page rendering is pending*/
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });

            page.getTextContent().then(function(textContent) {
                return textContent.items.map(function(item) {
                    return item.str;
                }).join(' ');
            }).then(function(pageStrg){
                $('#wdi_pdf_text').text(pageStrg);
            });
        }, (a, b, c)=>{
            console.log("a: "+a);
            console.log("b: "+b);
            console.log("c: "+c);
        });


        /* Update page counters*/
        document.getElementById('page_num').textContent = num;
    }

    /**
    * If another page rendering in progress, waits until the rendering is
    * finised. Otherwise, executes rendering immediately.
    */
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
            $progress_page.val(num);
            setTimeout(function() {
                wdi.audio.stop();
                setTimeout(()=>{
                    wdi.audio.play();
                }, 500);
            }, 500);
        }
    }

    /*Displays previous page.*/
    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }
    document.getElementById('wdi_pdf_prev').addEventListener('click', onPrevPage);

    /*Displays next page.*/
    function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }
    document.getElementById('wdi_pdf_next').addEventListener('click', onNextPage);

    /*Displays last page.*/
    function onLastPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum = pdfDoc.numPages;
        queueRenderPage(pageNum);
    }
    document.getElementById('wdi_pdf_last').addEventListener('click', onLastPage);

    /*Displays last page.*/
    function onFirstPage() {
        pageNum = 1;
        queueRenderPage(pageNum);
    }
    document.getElementById('wdi_pdf_first').addEventListener('click', onFirstPage);

    function loadPdf(){
        var pdfInput = document.getElementById('pdf');
        if(pdfInput.files.length) {
            var pdfFile = pdfInput.files[0];
            if(pdfFile.type.indexOf('pdf')!=-1){
                function _onload() {
                    pageNum = 1;
                    var arrayBuffer = this.result;

                    pdfjsLib.getDocument({data: arrayBuffer}).then(function(pdfDoc_) {
                        pdfDoc = pdfDoc_;
                        document.getElementById('page_count').textContent = pdfDoc.numPages;
                        $progress_page.attr('max', pdfDoc.numPages);

                        /* Initial/first page rendering*/
                        renderPage(pageNum);
                    });
                }

                var reader = new FileReader();
                reader.onload = _onload;
                reader.readAsArrayBuffer(pdfFile);
            } else {
                console.log('Esse arquivo não é PDF. Tipo de arquivo encontrado: ' + pdfFile.type);
            }
        } else {
            console.log('Selecione um PDF');
        }
    }
    window.loadPdf = loadPdf;
});

/*Asynchronously downloads PDF.*/