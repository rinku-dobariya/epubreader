import React, { Component } from 'react'
import Epub from 'epubjs'

export default class epubReader extends Component {

    constructor(props)
    {
        super(props);
        const Book = Epub(props.url)
        this.rendition = Book.renderTo("rinku",{spread: "always"});
        this.rendition.display();
        this.state = {
            toc: []
        }
        Book.loaded.navigation.then(({ toc }) => {
            this.setState(
                {
                toc: toc
                }
            )
        })
        this.OnclickNext = this.OnclickNext.bind(this);
        this.OnclickPrev = this.OnclickPrev.bind(this);
        this.OnChangeToc = this.OnChangeToc.bind(this);
        this.onChangeFont = this.onChangeFont.bind(this);
        
    }

    OnclickNext(e) {
        this.rendition.next();
    }
    OnclickPrev(e) {
        this.rendition.prev();
    }
    OnChangeToc(e)
    {
        this.rendition.display(e.target.value);
    }
    onChangeFont(e)
    {
        this.rendition.themes.fontSize(e.target.value+'%')
    }

  render() {
    return (
        <div className="container">
            <div className="row align-items-start">
            <span onClick={this.OnclickPrev} className="col"> Previous </span>
            <span onClick={this.OnclickNext} className="col"> Next </span>
            <div className="col">
            <label>
                Table of content
            </label>
            <select name="tocSel" id="tocSel"  onChange={this.OnChangeToc}>
                {this.state.toc.map((element) => {
                  return <option key={element.label} value={element.href}>{element.label}</option>
                })}
            </select>
            </div>
            <div className="col">
                <label>Font size</label>
                <input type="range" className="form-range" min="100" max="500" id="customRange2" onChange={this.onChangeFont}/>
            </div>
            
            <div id="rinku" className='container-md'></div>
            </div>
        </div>
    )
  }
}
