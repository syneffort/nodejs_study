const input = "name=name1; test=이건 테스트 임!";
const result = input.split(';')
                    .map(v => v.split('='))
                    .reduce((acc, [k, v]) => {
                        acc[k.trim()] = v;
                        return acc;
                    }, {});

console.log(result);

console.log(result.name);
