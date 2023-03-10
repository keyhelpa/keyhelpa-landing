import React from "react";
import Colors from "common/Colors";
import Style from "./Style";
import Button from "components/increment/generic/form/Button";
import csvExport from "components/increment/generic/export/csv";
import TemplatePdf from "components/increment/generic/export/pdfCsv";
import pdfFonts from "pdfmake/build/vfs_fonts";
import PDFTemplate from "pdfmake";
import { connect } from "react-redux";

const { vfs } = pdfFonts.pdfMake;
PDFTemplate.vfs = vfs;
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PdfTemplate: TemplatePdf,
    };
  }

  async exportPdf() {
    const { user } = this.props.state;
    const { header, data } = this.props;
    let body = [];
    if (data && data.length > 0) {
      let headers = await header.map((item) => {
        return {
          text: item.title,
          bold: true,
          alignment: "center",
          fontSize: 10,
          color: "#e62d7e",
          borderColor: ["#e62d7e", "#e62d7e", "#e62d7e", "#e62d7e"],
        };
      });
      let width = await header.map((item) => {
        return "*";
      });
      body.push(headers);
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        let object = [];
        await header.map((el, ndx) => {
          let newObject = {
            text: item[el.variable],
            fontSize: 10,
            alignment: "center",
            margin: [0, 5],
            borderColor: ["#D3D3D3", "#D3D3D3", "#D3D3D3", "#D3D3D3"],
          };
          object.push(newObject);
        });
        body.push(object);
      }

      this.state.PdfTemplate.getData(body);
      this.state.PdfTemplate.getUser(user);
      this.state.PdfTemplate.getWidth(width);
      this.state.PdfTemplate.template();
    } else {
      alert("No reports to downloaded.");
    }
  }

  async exportCsv() {
    const { data, header } = this.props;
    let array = [];
    if (data && data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        let object = {};
        await header.map((el, ndx) => {
          object[el.variable] = item[el.variable];
        });
        array.push(object);
      }

      let headers = header.map((item) => {
        return item.title;
      });
      csvExport.exportData(array, "Reports", headers);
    } else {
      alert("No reports to be exported.");
    }
  }

  render() {
    const { data } = this.props;
    return (
      <div style={Style.mainContainer} className="full-width-mobile">
        {this.props.csv && (
          <Button
            title={"Download in CSV"}
            onClick={() => {
              this.exportCsv();
            }}
            style={{
              float: "center",
              backgroundColor: "transparent",
              borderWidth: 0.5,
              borderColor: Colors.primary,
              color: Colors.primary,
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
            className={"btn btn-primary-reverse full-width-mobile"}
          />
        )}

        {this.props.pdf && (
          <Button
            title={"Download in PDF"}
            onClick={() => {
              this.exportPdf();
            }}
            style={{
              float: "center",
              backgroundColor: "transparent",
              borderWidth: 0.5,
              borderColor: Colors.primary,
              color: Colors.primary,
              paddingLeft: "40px",
              paddingRight: "40px",
              marginLeft: "10px",
            }}
            className={"btn btn-primary-reverse full-width-mobile mt-mobile-25"}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
