import {CodegenConfig} from "@graphql-codegen/cli";

const scalars = {
    StartAT: "string",
    EndAt: "string",
}
const config: CodegenConfig = {
    schema: 'http://localhost:3000/graphql',
    overwrite: true,
    documents: "src/**/*.graphql",
    generates: {
        "src/__generated__/types.ts": {
            plugins: [
                "typescript"
            ],
            config: {
                scalars
            }
        },
        src: {
            preset: "near-operation-file",
            presetConfig: {
                folder: "__generated__",
                extension: ".tsx",
                baseTypesPath: "__generated__/types.ts"
            },
            plugins: [
                {
                    add: {
                        content: [
                            '// 🛑 NOTICE: This code result of code generation - DO NOT TRY TO EDIT IT',
                            '// 🛑 NOTICE: __generated__ folders should be added to .gitignore'
                        ]
                    }
                },
                "typescript-operations",
                "typescript-react-apollo",
                "named-operations-object"
            ],
            config: {
                withHooks: true,
                identifierName: "namedOperations",
                scalars
            }
        }
    }
};

export default config;