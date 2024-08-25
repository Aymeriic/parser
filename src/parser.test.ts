import { parseWorkflows } from './parser';

describe('parseWorkflows', () => {
    it('should correctly parse the input JSON and produce the expected output JSON', () => {
        const inputJson = {
            workflows: {
                "cmNyJ": {
                    properties: { element_id: "cmNuA" },
                    type: "ButtonClicked",
                    id: "cmNyH",
                    actions: {
                        "0": {
                            properties: { value: "1d", element_id: "cmNth", custom_state: "custom.selected_" },
                            type: "SetCustomState",
                            id: "cmNyN"
                        }
                    }
                }
            }
        };

        const expectedOutput = {
            atoms: {
                "cmNuA": {
                    uid: "cmNuA",
                    logic: {
                        "cmNyJ": {
                            nodes: {
                                "cmNyH": {
                                    uid: "cmNyH",
                                    type: "ButtonClicked"
                                },
                                "cmNyN": {
                                    uid: "cmNyN",
                                    type: "SetCustomState",
                                    parameters: {
                                        value: "1d",
                                        element_id: "cmNth",
                                        custom_state: "custom.selected_"
                                    }
                                }
                            },
                            connections: {
                                "cmNyH": {
                                    success: {
                                        "cmNyN": {
                                            order: 0,
                                            to: "cmNyN"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        const outputJson = parseWorkflows(inputJson);
        expect(outputJson).toEqual(expectedOutput);
    });
});
