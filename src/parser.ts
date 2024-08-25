type Workflow = {
    properties: {
        element_id: string;
    };
    type: string;
    id: string;
    actions: {
        [key: string]: Action;
    };
};

type Action = {
    properties: {
        value: string;
        element_id: string;
        custom_state: string;
    };
    type: string;
    id: string;
};

type InputJson = {
    workflows: {
        [key: string]: Workflow;
    };
};

type OutputJson = {
    atoms: {
        [key: string]: Atom;
    };
};

type Atom = {
    uid: string;
    logic: {
        [key: string]: Logic;
    };
};

type Logic = {
    nodes: {
        [key: string]: Node;
    };
    connections: {
        [key: string]: Connection;
    };
};

type Node = {
    uid: string;
    type: string;
    parameters?: {
        value: string;
        element_id: string;
        custom_state: string;
    };
};

type Connection = {
    success: {
        [key: string]: ConnectionDetail;
    };
};

type ConnectionDetail = {
    order: number;
    to: string;
};

export const parseWorkflows = (inputJson: InputJson): OutputJson => {
    const outputJson: OutputJson = { atoms: {} };

    for (const [workflowId, workflow] of Object.entries(inputJson.workflows)) {
        const elementId = workflow.properties.element_id;

        if (!outputJson.atoms[elementId]) {
            outputJson.atoms[elementId] = {
                uid: elementId,
                logic: {}
            };
        }

        const atomLogic: Logic = {
            nodes: {
                [workflow.id]: {
                    uid: workflow.id,
                    type: workflow.type
                }
            },
            connections: {
                [workflow.id]: {
                    success: {}
                }
            }
        };

        for (const [actionOrder, action] of Object.entries(workflow.actions)) {
            atomLogic.nodes[action.id] = {
                uid: action.id,
                type: action.type,
                parameters: action.properties
            };

            atomLogic.connections[workflow.id].success[action.id] = {
                order: parseInt(actionOrder, 10),
                to: action.id
            };
        }

        outputJson.atoms[elementId].logic[workflowId] = atomLogic;
    }

    return outputJson;
};

// Entry data
const inputJson: InputJson = {
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
        },
        "cmNyU": {
            properties: { element_id: "cmNvI" },
            type: "ButtonClicked",
            id: "cmNyO",
            actions: {
                "0": {
                    properties: { value: "1m", element_id: "cmNth", custom_state: "custom.selected_" },
                    type: "SetCustomState",
                    id: "cmNyT"
                }
            }
        },
        "cmNyb": {
            properties: { element_id: "cmNuw" },
            type: "ButtonClicked",
            id: "cmNyV",
            actions: {
                "0": {
                    properties: { value: "1w", element_id: "cmNth", custom_state: "custom.selected_" },
                    type: "SetCustomState",
                    id: "cmNya"
                }
            }
        },
        "cmNyl": {
            properties: { element_id: "cmNvC" },
            type: "ButtonClicked",
            id: "cmNyf",
            actions: {
                "0": {
                    properties: { value: "2w", element_id: "cmNth", custom_state: "custom.selected_" },
                    type: "SetCustomState",
                    id: "cmNyh"
                }
            }
        }
    }
};

const outputJson = parseWorkflows(inputJson);
console.log(JSON.stringify(outputJson, null, 4));
