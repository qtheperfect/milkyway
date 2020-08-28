#! /bin/bash

work_local="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if [ -f .rsyncRemote ]; then
	work_remote=`cat .rsyncRemote`
else
	work_remote="/path/to/the/file/directory/in/some/place/else/or/a/remote/computer/"
fi

exld="--exclude '*output'"
	
confirm1ce=1
updown="nothing"
for v in $@ ; do
    if [ $v == 'down' ] ; then
	updown='down'
    elif [ $v == 'up' ] ; then
	updown='up'
    elif [ $v == '-y' ] ; then
	confirm1ce=0
    fi
done

function confirmer {
    echo $1
    if [ $confirm1ce == '1' ] ; then
        read -p " OK ? "
    fi
}
	

if [ $updown == 'down' ] ; then
    cmd="rsync -avtu $exld $work_remote/ ${work_local%%/}"
    confirmer "$cmd"
    sh -c "$cmd"
elif [  $updown == 'up' ] ; then
    cmd="rsync -avtu $exld $work_local/ ${work_remote%%/}"
    confirmer "$cmd"
    sh -c "$cmd"
fi

    
