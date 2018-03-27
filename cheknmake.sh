PLANT="java -jar ../bin/plantuml.jar"
mkdir -p build
ERROR=false
declare -a modules=("redux" "Solidity" "react")
for dr in "${modules[@]}";do
  cd $dr
  OUT=$(cat index.puml | $PLANT -syntax)
  if [[ $OUT = *"ERROR"* ]] ; then
    ERROR=true
    echo "$OUT"
  else
    $PLANT index.puml -o ../build/$dr.png
  fi
  cd ..
done
if $ERROR; then
  echo "ERRORED"
  exit 1
fi
exit 0
