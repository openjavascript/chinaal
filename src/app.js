
import fs from "fs-extra";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import shell from 'shelljs';

import inquirer from 'inquirer';

const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import * as CONST from './data/constant.js';
import * as DATA from './data/data.js';

import ProjectExample from './ProjectExample.js';



export default class App {
    constructor( appRoot, projectRoot, packJSON ) {

        this.appRoot = appRoot;
        this.projectRoot = projectRoot;
        this.packJSON = packJSON;


        console.log( [ 
            'appRoot: ' + this.appRoot
            , 'projectRoot: ' + this.projectRoot 
            ].join("\n") );

        this.init();

        console.log();
    }

    init() {
        clear();

        this.project;
        this.prompt = inquirer.createPromptModule();
        this.welcome();

        this.system = 1;

        /*
        shell.exec(  [ 
            'cd ' + this.projectRoot
            , 'git config core.fileMode false && git config core.autocrlf false'
        ].join('&&') );
        */

        console.log();
        new Promise( function( resolve ){
            setTimeout( resolve, 1);
        }).then( () => {
            return this.getAlFilePath();
        }).then( () => {
            this.isGood = 1;

            return new Promise( function( resolve ){
                setTimeout( resolve, 1);
            });
        }).then( () => {
			if( !this.isGood ){
				this.confirm = 'no';
				return;
			}
            return this.getConfirm();
        }).then( ()=>{
		 if( this.confirm == 'no' ) return;
            this.project = new ProjectExample( this );
        });
    }

    async getConfirm(){
        let data = await this.prompt( DATA.Q_CONFIRM );
        this.confirm = data.confirm;
    }

    async getAlFilePath(){
        let data = await this.prompt( DATA.Q_ALFILEPATH );
        this.alfilepath = data.alfilepath;

        let apath = path.resolve( this.appRoot, this.alfilepath );
        let ppath = path.resolve( this.projectRoot, this.alfilepath );

        if( fs.pathExistsSync( ppath ) ){
            this.sourcePath = ppath;
        }else{
            this.sourcePath = apath;
        }
        //console.log( 'alfilepath', this.alfilepath, this.sourcePath );
    }

    fileExists( file ) {
        return fs.existsSync( file );
    }

    welcome() {
        console.log(
          chalk.yellow(
            figlet.textSync( CONST.APPNAME, { horizontalLayout: 'full' })
          )
        );
        console.log(
          chalk.bold.yellow(
            `${CONST.TITLE} - ${this.packJSON.version}`
          )
        );
        console.log();
        console.log( info( `github: ${this.packJSON.repository.url}` ) );

        console.log();
        console.log( ( '使用:' ) );
        console.log( ( '     方法1: 切换到项目根目录, 然后执行命令 chinaal' ) );
        console.log( info('         cd projectRoot && chinaal ') ); 
        console.log();
        console.log( ( '     方法2: 使用 chinaal 路径, 支持相对路径' ) );
        console.log( info('         chinaal /var/www/your_project_root ' ) ); 
        console.log();
    }

}

export function init( APP_ROOT, PROJECT_ROOT, packJSON ){
    let AppIns = new App( APP_ROOT, PROJECT_ROOT, packJSON ); 
}

