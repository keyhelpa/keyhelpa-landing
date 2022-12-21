import { ExportToCsv } from 'export-to-csv'

const csvExport = {
  exportData: (data, title, header) => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: title,
      useTextFile: false,
      useBom: true,
      // useKeysAsHeaders: true,
      headers: header
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }
}

export default csvExport;