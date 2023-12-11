import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdatePokemonDTO {
    @IsOptional()
    @IsOptional({
        message: 'the name should be a string',

    })
    name?: string;
    @IsOptional()
    @IsInt({
        message: 'the pokedexNumber should be a number',

    })
    pokedexNumber?: number;
    @IsOptional()

    @IsString({
        message: 'the imgName should be a string',
    })
    imgName?: string;
    @IsOptional()

    @IsInt({
        message: 'the generation should be a number',
    })
    generation?: number;
    @IsOptional()
    @IsString({
        message: 'the imgName should be a string',
    })
    evolutionStage?: string;
    @IsOptional()
    @IsBoolean({
        message: 'the evolved should be a boolean',
    })
    evolved?: boolean;
    @IsOptional()
    @IsInt({
        message: 'the familyID should be a number',
    })
    familyId?: number;
    @IsOptional()

    @IsBoolean({
        message: 'the crossGen should be a boolean',

    })
    crossGen?: boolean;
    @IsOptional()
    @IsString({
        message: 'the type1 should be a string',
    })
    type1?: string;
    @IsOptional()
    @IsString({
        message: 'the type2 should be a string',
    })
    type2?: string;
    @IsOptional()
    @IsString({
        message: 'the weather1 should be a string',
    })
    weather1?: string;
    @IsOptional()
    @IsString({
        message: 'the weather2 should be a string',
    })
    weather2?: string;
    @IsOptional()
    @IsInt({
        message: 'the ATK should be a number',

    })
    atk?: number;
    @IsOptional()
    @IsInt({
        message: 'the DEF should be a number',

    })
    def?: number;
    @IsOptional()
    @IsInt({
        message: 'the STA should be a number',

    })
    sta?: number;
    @IsOptional()
    @IsBoolean({
        message: 'the legendary should be a boolean',

    })
    legendary?: boolean;
    @IsOptional()
    @IsBoolean({
        message: 'the aquireable should be a boolean',

    })
    aquireable?: boolean;
    @IsOptional()

    @IsBoolean({
        message: 'the spawns should be a boolean',

    })
    spawns?: boolean;
    @IsOptional()
    @IsBoolean({
        message: 'the regional should be a boolean',

    })
    regional?: boolean;
    @IsOptional()
    @IsInt({
        message: 'the raidable should be a number',

    })
    raidable?: number;
    @IsOptional()
    @IsInt({
        message: 'the hatchable should be a number',

    })
    hatchable?: number;
    @IsOptional()
    @IsBoolean({
        message: 'the shiny should be a boolean',

    })
    shiny?: boolean;
    @IsOptional()
    @IsBoolean({
        message: 'the nest should be a boolean',

    })
    nest?: boolean;
    @IsOptional()
    @IsBoolean({
        message: 'the new should be a boolean',

    })
    valueOfNew?: boolean;
    @IsOptional()
    @IsBoolean({
        message: 'the notGettable should be a boolean',
    })
    notGettable?: boolean;
    @IsOptional()
    @IsBoolean({
        message: 'the futureEvolve should be a boolean',
    })
    futureEvolve?: boolean;
    @IsOptional()

    @IsInt({
        message: 'the cpAt40 should be a number',

    })
    cp40?: number;
    @IsOptional()

    @IsInt({
        message: 'the cpAt39 should be a number',

    })
    cp39?: number;
}