import React, { useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";
import ScreenshotDialog from "./screenshot-dialog";
import { action } from "@storybook/addon-actions";
import { createStores } from "../store/review-store";
import FakeAdvancedReviewService from "../.storybook/fake-advanced-review-service";
import resources from "../.storybook/resources.json";
import { Provider } from "mobx-react";

const stores = createStores(new FakeAdvancedReviewService(), resources);

function Component() {
    const [anchorElement, setAnchorElement] = useState(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const onIframeLoaded = () => {
        setIframeLoaded(true);
    };

    return (
        <div>
            <div
                id="iframeWrapper"
                style={{
                    width: "100%",
                    height: "800px",
                    position: "absolute",
                    top: "0",
                    overflowY: "scroll",
                    overflowX: "auto"
                }}
            >
                <iframe
                    id="iframe"
                    onLoad={onIframeLoaded}
                    ref={setAnchorElement}
                    style={{ width: "100%", height: "985px" }}
                    src="../.storybook/fake_OPE.html"
                />
            </div>

            {!!anchorElement && iframeLoaded && (
                <ScreenshotDialog
                    maxWidth={500}
                    maxHeight={300}
                    iframe={anchorElement}
                    onImageSelected={action("image selected")}
                    toggle={() => {}}
                />
            )}
        </div>
    );
}

storiesOf("Screenshot picker", module).add("default", () => {
    return (
        <Provider {...stores}>
            <Component />
        </Provider>
    );
});
