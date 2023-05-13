const fs = require("fs");

const regexAppVersion = /appVersion:(.*)?/;
const regexSemVer =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;

function verifySemVer(version) {
  if (!regexSemVer.test(version)) {
    throw new Error("semantic version is invalid");
  }
  return version;
}

function changeAppVersion(dir, semVersion, isSemVer) {
  try {
    if (isSemVer) {
      verifySemVer(semVersion);
    }
    var chartYamlContent = fs.readFileSync(dir, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (e) {
    console.error(e);
    return;
  }

  var updatedChartYamlContent = chartYamlContent.replace(
    regexAppVersion,
    "appVersion: " + semVersion
  );

  fs.writeFile(dir, updatedChartYamlContent, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(
      "changed version: \n%s ==> %s",
      chartYamlContent.match(regexAppVersion)[0],
      "appVersion: " + semVersion
    );
  });
}

changeAppVersion("charts/awesome/Chart.yaml", "sha256:xxxxd5c8786bb9e621a45ece0dbxxxx1cdc624ad20da9fe62e9d25490f33xxxx", false);
