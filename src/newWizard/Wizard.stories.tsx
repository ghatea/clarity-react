/**
 * Copyright (c) 2019 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

import React from "react";
import {storiesOf} from "@storybook/react";
import {Wizard, WizardSize, WizardStep} from ".";
import {State, Store} from "@sambego/storybook-state";
import {Button} from "../forms/button";
import {Input} from "../forms/input/Input";
import {Select, SelectOption} from "../forms/select";

const store = new Store({
    open: false,
    activeWizard: "",
    basicInfoValid: true,
    basicInfoComplete: false,
    handleToggleWizard: (size: string) =>
        store.set({
            open: true,
            activeWizard: size,
        }),
    handleClose: (): void =>
        store.set({
            open: false,
        }),
    handleValidate: (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value.length > 2) {
            store.set({
                basicInfoValid: true,
                basicInfoComplete: true,
            });
        } else {
            store.set({
                basicInfoValid: false,
                basicInfoComplete: false,
            });
        }
    },
});

storiesOf("Wizard", module).add("Wizard Sizes", _props => (
    <State store={store}>
        {state => (
            <div>
                <p>Click to activate a wizard of the described size</p>
                <Button key={0} primary link onClick={() => state.handleToggleWizard(WizardSize.MEDIUM)}>
                    MEDIUM
                </Button>
                <Button key={1} primary link onClick={() => state.handleToggleWizard(WizardSize.LARGE)}>
                    LARGE
                </Button>
                <Button key={2} primary link onClick={() => state.handleToggleWizard(WizardSize.XLARGE)}>
                    X-LARGE
                </Button>

                <Wizard
                    key={3}
                    size={WizardSize.MEDIUM}
                    show={state.open && state.activeWizard === WizardSize.MEDIUM}
                    showCancel={true}
                    onClose={() => state.handleClose()}
                    title="Medium Wizard"
                >
                    <p>A non wizardstep child in here</p>
                    <WizardStep
                        id={0}
                        name="Basic Information"
                        valid={state.basicInfoValid}
                        complete={state.basicInfoComplete}
                    >
                        <Input label="Name" name="name" onChange={state.handleValidate} />
                        <Input
                            label="Height (feet)"
                            defaultValue={1}
                            max={10}
                            min={1}
                            name="heightFeet"
                            type="number"
                        />
                        <Input
                            label="Height (inches)"
                            defaultValue={1}
                            max={10}
                            min={1}
                            name="heightInches"
                            type="number"
                        />
                        <Input label="Weight" name="weight" placeholder="lbs" />
                        <Select value="3" label="Gender">
                            <SelectOption value="1"> Male </SelectOption>
                            <SelectOption value="2"> Female </SelectOption>
                            <SelectOption value="3"> Non-binary </SelectOption>
                        </Select>
                    </WizardStep>

                    <WizardStep id={1} name="Power" />

                    <WizardStep id={2} name="Weakness" />

                    <WizardStep id={3} name="Summary" />
                </Wizard>
                <Wizard
                    key={4}
                    size={WizardSize.LARGE}
                    show={state.open && state.activeWizard === WizardSize.LARGE}
                    onClose={() => state.handleClose()}
                    title="Medium Wizard"
                >
                    <WizardStep id={0} key={0} name={"Page 1"} />
                    <WizardStep id={1} key={1} name={"Page 2"} />
                </Wizard>
                <Wizard
                    key={5}
                    size={WizardSize.XLARGE}
                    show={state.open && state.activeWizard === WizardSize.XLARGE}
                    onClose={() => state.handleClose()}
                    title="Medium Wizard"
                >
                    <WizardStep id={0} key={0} name={"Page 1"} />
                    <WizardStep id={1} key={1} name={"Page 2"} />
                </Wizard>
            </div>
        )}
    </State>
));