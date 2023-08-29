import React, { useEffect } from "react";

const withLogger = (WrappedComponent) => {
  const WithLogger = (props) => {
    useEffect(() => {
      //Логирование когда компонент примонтировался
      console.log(`Компоненты ${WrappedComponent.name} примонтировался`);
      return () => {
        //Логирование компонента при размонтировании
        console.log(`Компоненты ${WrappedComponent.name} размонтировался`);
      };
    }, []);
    useEffect(() => {
      //Логирование компонента при обновлении
      console.log(`Компоненты ${WrappedComponent.name} обновился`);
    });

    return <WrappedComponent {...props} />;
  };
  WithLogger.displayName = `withLogger(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WithLogger;
};
export default withLogger;
