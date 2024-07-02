const generatePDF = async (name) =>
    {
        const {PDFDocument, rgb} = PDFLib;

        const exBytes = await fetch("./Template.pdf").then((res) => {
            return res.arrayBuffer();
        });

        const exfont = await fetch("./Sanchez-Regular.ttf").then(res =>
            {
                return res.arrayBuffer()
        });

       
        const Pdfdoc = await PDFDocument.load(exBytes)

        Pdfdoc.registerFontkit(fontkit);
        const myfont = await Pdfdoc.embedFont(exfont);

        const pages = Pdfdoc.getPages();
        const firstPg = pages[0];

        //page dimensions
        const {width,height} = firstPg.getSize();

        //calculatee text width
        const fontSize = 30; // increases font size
        const textWidth = myfont.widthOfTextAtSize(name, fontSize);
  

        const x = (width - textWidth)/2 ;
        const y = height/2;




        firstPg.drawText(name,  {
            x:x,
            y:y,
            size: fontSize,
            font: myfont,
            color: rgb(0, 0, 1)
            
        });

        const uri = await Pdfdoc.saveAsBase64({dataUri: true});
        window.open(uri);
        document.querySelector("#mypdf").src = uri;
    };
  
    generatePDF(" Ishani ");