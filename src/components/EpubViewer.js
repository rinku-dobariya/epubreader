import Epub from 'epubjs'
import React,{useRef} from 'react'

function EpubViewer(props) {
    const Book = Epub(props.url)
    const rendition = Book.renderTo("rinku");
    rendition.display();
    //For next page
    const  OnclickNext =  (e) => {
      rendition.next();
    }
    //For previous
    const  OnclickPrev =  (e) => {
      // rendition.prev();
      rendition.direction('right');
    }

    //TOC
    const tocRef = useRef(null);
    
    Book.loaded.navigation.then(function(toc){
      console.log('toc',toc);

      var docfrag = document.createDocumentFragment();

      const element = tocRef.current;
      toc.forEach(function(chapter) {
        var option = document.createElement("li");
        option.textContent = chapter.label;
        // option.ref = chapter.href;

        docfrag.appendChild(option);
      });

      element.appendChild(docfrag);
    });
    
  return (
    <div className="container">
      <span onClick={OnclickPrev}> Previous - </span>
      <span onClick={OnclickNext}> Next </span>
      Table of content
      <ul className='toc' id='toc' ref={tocRef}></ul>
      <div id="rinku"></div>
    </div>
  )
}

export default EpubViewer
