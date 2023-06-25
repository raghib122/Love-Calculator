function calculateLovePercentage(name1, name2) {
    var loves = ["l", "o", "v", "e", "s"],
        countArray = [],
        count,
        jointNames;

    jointNames = (name1 + name2).toLowerCase();

    countArray = loves.map(function(item) {
        count = 0;
        for (var i = 0; i < jointNames.length; i += 1) {
            if (item === jointNames[i]) {
                count += 1;
            }
        }
        return count;
    });

    return love(countArray);
}

function love(array) {
    if (array.length > 2) {
        var newArray = array.map(function(item, index, array) {
            return item + array[index + 1];
        });
        var hold = [];
        newArray.forEach(function(item) {
            if (typeof item === "number" && !isNaN(item)) {
                if (item < 10) {
                    hold.push(item);
                } else if (item > 9) {
                    console.log('Splitting ' + item + " into " + item.toString()[0] + " and " + item.toString()[1]);
                    hold.push(parseInt(item.toString()[0]));
                    hold.push(parseInt(item.toString()[1]));
                }
            } else {
                console.log("Failed number check: " + item);
            }
        });
        return love(hold);
    } else {
        var lovePercentage = array[0] + "" + array[1];
        if (lovePercentage <= 50) {
            lovePercentage = Math.floor(Math.random() * (100 - 51 + 1) + 51); // Randomize percentage above 50%
        }
        lovePercentage += "%";
        return lovePercentage;
    }
}

document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    var fatherName = document.getElementsByName('father')[0].value.toLowerCase();
    var motherName = document.getElementsByName('mother')[0].value.toLowerCase();
    var myName = "me";

    if (fatherName && motherName) {
        if (
            (fatherName === "father" && motherName === myName) ||
            (fatherName === myName && motherName === "father") ||
            (motherName === "mother" && fatherName === myName) ||
            (motherName === myName && fatherName === "mother")
        ) {
            document.getElementById('result').textContent = "100%";
        } else {
            var lovePercentage = calculateLovePercentage(fatherName, motherName);
            document.getElementById('result').textContent = lovePercentage;
        }
    } else {
        document.getElementById('warning').textContent = "Please enter both Partner names.";
    }
}, false);
