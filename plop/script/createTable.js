const fs = require("fs");
const path = require("path");
module.exports = plop => obj =>
  new Promise(resolve => {
    const dataName = obj.dataName;
    fs.readFile(
      path.join(__dirname, `../data/${dataName}.json`),
      "utf8",
      (err, d) => {
        const data = JSON.parse(d);
        const option = data.data;
        let table = `
        <div class="table">
            <el-table :data="tableData" style="width: 100%">
                ${loop(
                  option,
                  ({ key, label, width, buttons }) =>
                    `<el-table-column
                        label="${label}"
                        ${key ? 'prop="' + key + '"' : ""}
                        ${width ? 'width="' + width + '"' : ""}
                    >
                        ${
                          buttons
                            ? `<template slot-scope="scope">
                                ${loop(
                                  buttons,
                                  ({ method, name }) =>
                                    `<el-button @click="${method}(scope.row)" type="text">${name}</el-button><i class="grey">|</i>`
                                )}
                            </template>`
                            : ""
                        }
                    </el-table-column>`
                )}
            </el-table>
            <pagination
                :total="pageData.total"
                :current-page="pageData.pageIndex"
                :size="pageData.pageSize"
                @onPageChange="changePage"
            />
        </div>
        `;
        let tableData = `
            tableData: [
                {${loop(option, ({ key }) => `${key}: "test info",`)}}
            ],
            pageData: {
                total: 120,
                pageSize: 20,
                pageIndex: 1
            },
        `;
        let methods = `
            changePage(){},
            ${loop(option, ({ buttons }) =>
              buttons
                ? `${loop(buttons, ({ method }) => `${method}(){},`)}`
                : ""
            )}
        `;
        plop.setPartial("table", table);
        plop.setPartial("tableData", tableData);
        plop.setPartial("methods", methods);
        resolve();
      }
    );
  });

const loop = (arr, func) => arr.map(item => func(item)).join("");
