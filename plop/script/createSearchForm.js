const fs = require("fs");
const path = require("path");
const { loop, createFormItemByType } = require("../tool");
module.exports = plop => obj =>
  new Promise(resolve => {
    const dataName = obj.dataName;
    fs.readFile(
      path.join(__dirname, `../data/${dataName}.json`),
      "utf8",
      (err, d) => {
        const data = JSON.parse(d);
        const option = data.data;
        let form = `
        <div class="search-form">
          <el-form size="small" :inline="true">
            <el-row>
              ${loop(
                option,
                item =>
                  `<el-col :span="6">
                      <el-form-item label="${item.name}:">
                        ${createFormItemByType("searchData", item)}
                      </el-form-item>
                  </el-col>`
              )}
            </el-row>
            <el-button size="small" type="primary" @click="search">搜 索</el-button>
            <el-button size="small" @click="reset">清 空</el-button>
          </el-form>
        </div>
        `;
        let searchData = `
          searchData: {
            ${loop(
              option,
              ({ key, defaultValue }) =>
                `${key}: ${
                  typeof defaultValue === "string"
                    ? '"' + defaultValue + '"'
                    : defaultValue
                },`
            )}
          },
        `;
        let methods = `
          search() {},
          reset() {},
        `;
        plop.setPartial("form", form);
        plop.setPartial("searchData", searchData);
        plop.setPartial("methods", methods);
        resolve();
      }
    );
  });
