const consoleOutputElement = document.querySelector("#console-output")!;
const oldconsole = console;
console = {
  ...oldconsole,
  log: function () {
    var joinedArguments: string = "";
    for (let arg of arguments) {
      if (arg !== null) {
        switch (typeof arg) {
          case "string":
            joinedArguments += arg;
            break;
          case "number":
            joinedArguments += "<span class='number'>" + arg + "</span>";
            break;
          case "boolean":
            joinedArguments += "<span class='boolean'>" + arg + "</span>";
            break;
          case "undefined":
            joinedArguments += "<span class='undefined'>undefined</span>";
            break;
          case "object":
            joinedArguments += JSON.stringify(arg);
            break;
          case "function":
            joinedArguments += String(arg);
            break;
          default:
            joinedArguments += typeof arg + ": " + arg;
        }
      } else joinedArguments += "<span class='undefined'>null</span>";

      // Add a space between arguments
      joinedArguments += "<br />";
    }

    // Append the joined arguments to the consoleOutput element
    consoleOutputElement.innerHTML += joinedArguments + "\n";

    // Call the original console.log function
    oldconsole.log.apply(console, arguments as any);
  },
  error: function () {
    consoleOutputElement.innerHTML +=
      "<span class='error'>" + arguments[0] + "</span><br />\n";
    oldconsole.error.apply(console, arguments as any);
  },
  warn: function () {
    consoleOutputElement.innerHTML +=
      "<span class='warn'>" + arguments[0] + "</span><br />\n";
    oldconsole.warn.apply(console, arguments as any);
  },
  clear: function () {
    consoleOutputElement.innerHTML = '';
    oldconsole.clear();
  }
};
