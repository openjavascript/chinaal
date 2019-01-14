
import fs from "fs-extra";
import path from "path";

import chalk from 'chalk';
import clear from 'clear';


const error = chalk.bold.red;
const warning = chalk.keyword('orange');
const success = chalk.greenBright;
const info = chalk.bold.blue;

import Project from './Project.js';

export default class ProjectExample extends Project {
    constructor( app ){
        super( app );
    }

    init() {
        this.report_dir = path.resolve( this.app.projectRoot, 'china_report' );

        this.path_all = path.resolve( this.report_dir, 'all.json' );
        this.path_city_txt = path.resolve( this.report_dir, 'city.txt' );

        this.splitSource();
        this.mkreportFile();
    }

    splitSource(){
        let file = fs.readFileSync( this.app.sourcePath, 'utf8' );
        file = file.replace( /[ \t]+$/gm, '' );
        file = file.split( /[\r\n]+/g );

        this.sourceAr = file;

        this.keyItems = {};

        this.levels = {};

        this.cityText = [];

        let curLevel1, curLevel2;
        file.map( (item)=>{
            let tmp = item.split( /[\s]+/g )
            if( tmp.length < 2 ) return;

            let key = tmp[0];

            this.keyItems[ key ] = tmp[1];

            let level1Key = parseInt( key.slice( 0, 2 ), 10 )
                , level2Key = parseInt( key.slice( 2, 4 ), 10 )
                , level3Key = parseInt( key.slice( 4, 6 ), 10 )
                ;

            //console.log( level1Key, level2Key, level3Key );

            if( !level2Key && !level3Key && !( level1Key in this.levels ) ){
                curLevel1 = this.levels[ key ] = {
                    label: tmp[1], key: key
                };
                curLevel2 = '';

                this.cityText.push( tmp[1] );
            }

            if( curLevel1 && level2Key && !level3Key ){
                curLevel2 = this.levels[ key ] = {
                    label: tmp[1], key: key
                };
                curLevel1.items = curLevel1.items || [];
                curLevel1.items.push( curLevel2 );


                this.cityText.push( new Array(5).join(' ') + tmp[1] );
            }


            if( level2Key && level3Key  ){
                if( curLevel2 ){
                    curLevel2.items = curLevel2.items || [];
                    curLevel2.items.push( {
                        label: tmp[1], key: key
                    } );
                }else{
                    curLevel1.items = curLevel1.items || [];

                    curLevel1.items.push( {
                        label: tmp[1], key: key
                    });
                }
            }

        });
    }

    mkreportFile(){
        fs.mkdirpSync( this.report_dir );

        fs.writeFileSync( this.path_all, JSON.stringify( this.levels, null, 4 ), { encoding: 'utf8' } );
        fs.writeFileSync( this.path_city_txt, this.cityText.join("\n"), { encoding: 'utf8' } );
    }

}
