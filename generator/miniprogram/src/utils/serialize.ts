export const indexOf = (haystack, needle) => {
  for (let i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) return i;
  }
  return -1;
};

export const stringify = (obj, replacer?, spaces?, cycleReplacer?) => {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
};

export const stringifyError = (value) => {
  let err = {
    stack: value.stack,
    message: value.message,
    name: value.name
  };

  for (let i in value) {
    if (Object.prototype.hasOwnProperty.call(value, i)) {
      err[i] = value[i];
    }
  }

  return err;
};

export const serializer = (replacer, cycleReplacer) => {
  let stack = [];
  let keys = [];

  if (cycleReplacer == null) {
    cycleReplacer = function (key, value) {
      if (stack[0] === value) {
        return '[Circular ~]';
      }
      return (
        '[Circular ~.' + keys.slice(0, indexOf(stack, value)).join('.') + ']'
      );
    };
  }

  return function (key, value) {
    if (stack.length > 0) {
      let thisPos = indexOf(stack, this);
      // @ts-ignore
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);

      if (~indexOf(stack, value)) {
        value = cycleReplacer.call(this, key, value);
      }
    } else {
      stack.push(value);
    }

    return replacer == null
      ? value instanceof Error
        ? stringifyError(value)
        : value
      : replacer.call(this, key, value);
  };
};

// try {
//   throw new Error("Whoops!");
// } catch (e) {
//   e.name = {stark:'wang',hehe:{hh:'111'}}
//   let ee = stringify(e)
//   console.log(typeof ee)
// }
