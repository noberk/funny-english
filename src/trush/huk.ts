//const [age, setAge]  = useState(21);

const React = (function() {
    let _val:any;
    return {
      render(Component:any) {
        const Comp = Component();
        Comp.render();
        return Comp;
      },
      useState(init:any) {
        _val = _val || init;
  
        function setState(newVal:any) {
          _val = newVal;
        }
  
        return [_val, setState];
      }
    };
  })();

 
  
  function AgeComp() {
    const [age, setAge] = React.useState(21);
    return {
      render() {
        console.log(age);
      },
      ageUp() {
        setAge(age + 1);
      }
    };
  }
  
  
  
  let App = React.render(AgeComp);
  App.ageUp();
  App = React.render(AgeComp);
  App.ageUp();
  
  export {}