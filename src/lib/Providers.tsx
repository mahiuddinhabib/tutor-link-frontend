"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <ConfigProvider
          theme={{
            // algorithm: theme.darkAlgorithm,
            token: {
              // Seed Token
              colorPrimary: "#38d68a",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
